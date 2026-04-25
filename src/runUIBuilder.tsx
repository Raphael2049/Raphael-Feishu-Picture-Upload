// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

function ensureId(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if ('id' in value) return value.id;
    if ('fieldId' in value) return value.fieldId;
  }
  return String(value);
}

// 类型守卫：判断字段值是否为附件数组
function isAttachmentArray(value: any): value is Array<{ file_token: string; name: string; size: number; type: string }> {
  return Array.isArray(value) && value.every(item => item && typeof item.file_token === 'string' && typeof item.name === 'string');
}

export default async function main(uiBuilder: UIBuilder, { t }: any) {
  uiBuilder.form(
    (form) => ({
      formItems: [
        form.tableSelect('tableId', { label: '选择目标表格' }),
        form.fieldSelect('matchFieldId', {
          label: '匹配字段（文本）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [1],
        }),
        form.fieldSelect('mainImageFieldId', {
          label: '主图字段（附件）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [17],
        }),
        form.fieldSelect('carouselFieldId', {
          label: '轮播图字段（附件）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [17],
        }),
        form.fieldSelect('aplusFieldId', {
          label: 'A+ 字段（附件）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [17],
        }),
      ],
      buttons: ['选择文件夹并上传'],
    }),
    async ({ values }) => {
      try {
        const vals = values as any;
        const tableId = ensureId(vals.tableId);
        if (!tableId) {
          uiBuilder.text('❌ 未选择表格');
          return;
        }
        const table = await bitable.base.getTableById(tableId);
        uiBuilder.text(`✅ 表格: ${await table.getName()}`);

        const matchFieldId = ensureId(vals.matchFieldId);
        const mainFieldId = ensureId(vals.mainImageFieldId);
        const carouselFieldId = ensureId(vals.carouselFieldId);
        const aplusFieldId = ensureId(vals.aplusFieldId);

        // 验证字段存在性
        const fields = await table.getFieldMetaList();
        const fieldIdSet = new Set(fields.map(f => f.id));
        if (matchFieldId && !fieldIdSet.has(matchFieldId)) {
          uiBuilder.text(`❌ 匹配字段不存在，请重新选择`);
          return;
        }
        if (mainFieldId && !fieldIdSet.has(mainFieldId)) {
          uiBuilder.text(`❌ 主图字段不存在，请重新选择`);
          return;
        }
        if (carouselFieldId && !fieldIdSet.has(carouselFieldId)) {
          uiBuilder.text(`❌ 轮播图字段不存在，请重新选择`);
          return;
        }
        if (aplusFieldId && !fieldIdSet.has(aplusFieldId)) {
          uiBuilder.text(`❌ A+ 字段不存在，请重新选择`);
          return;
        }

        // 选择文件夹
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.webkitdirectory = true;
        fileInput.multiple = true;
        document.body.appendChild(fileInput);
        const files = await new Promise<FileList>((resolve) => {
          fileInput.onchange = () => {
            if (fileInput.files) resolve(fileInput.files);
            document.body.removeChild(fileInput);
          };
          fileInput.click();
        });

        if (!files.length) {
          uiBuilder.text('未选择文件夹');
          return;
        }

        // 解析子文件夹
        const folderMap = new Map<string, File[]>();
        for (const file of Array.from(files)) {
          const relPath = (file as any).webkitRelativePath;
          if (!relPath) continue;
          const parts = relPath.split('/');
          if (parts.length < 2) continue;
          const folder = parts[0];
          if (!folderMap.has(folder)) folderMap.set(folder, []);
          folderMap.get(folder)!.push(file);
        }

        const folders = Array.from(folderMap.keys());
        if (folders.length === 0) {
          uiBuilder.text('未找到子文件夹');
          return;
        }

        uiBuilder.showLoading(`处理 ${folders.length} 个产品...`);

        // 批量上传函数，返回完整附件信息
        async function uploadBatch(files: File[]): Promise<Array<{ file_token: string; name: string; size: number; type: string }>> {
          const BATCH = 20;
          const results: Array<{ file_token: string; name: string; size: number; type: string }> = [];
          for (let i = 0; i < files.length; i += BATCH) {
            const batch = files.slice(i, i + BATCH);
            const tokens = await bitable.base.batchUploadFile(batch);
            for (let j = 0; j < batch.length; j++) {
              results.push({
                file_token: tokens[j],
                name: batch[j].name,
                size: batch[j].size,
                type: batch[j].type,
              });
            }
          }
          return results;
        }

        const records = [];
        for (const folder of folders) {
          const fileList = folderMap.get(folder)!;
          const main = fileList.filter(f => f.name.toLowerCase().includes('主图'));
          const carousel = fileList.filter(f => f.name.toLowerCase().includes('轮播图'));
          const aplus = fileList.filter(f => f.name.toLowerCase().includes('a+'));

          const all = [...main, ...carousel, ...aplus];
          if (all.length === 0) continue;

          const uploaded = await uploadBatch(all);
          // 构建 file 到附件对象的映射
          const fileToAttachment = new Map<File, { file_token: string; name: string; size: number; type: string }>();
          for (let idx = 0; idx < all.length; idx++) {
            fileToAttachment.set(all[idx], uploaded[idx]);
          }

          const build = (files: File[]) => files.map(f => fileToAttachment.get(f)!).filter(v => v && v.file_token);

          const fields: any = {};
          if (matchFieldId) fields[matchFieldId] = folder;
          if (mainFieldId && main.length) fields[mainFieldId] = build(main);
          if (carouselFieldId && carousel.length) fields[carouselFieldId] = build(carousel);
          if (aplusFieldId && aplus.length) fields[aplusFieldId] = build(aplus);

          records.push({ fields });
        }

        if (records.length === 0) {
          uiBuilder.text('没有可写入的记录');
          uiBuilder.hideLoading();
          return;
        }

        // 批量写入
        const BATCH_REC = 500;
        let added = 0;
        for (let i = 0; i < records.length; i += BATCH_REC) {
          const batch = records.slice(i, i + BATCH_REC);
          const newRecordIds = await table.addRecords(batch);
          added += batch.length;

          // 读取第一条写入的记录验证
          if (i === 0 && newRecordIds.length > 0) {
            const sampleRecord = await table.getRecordById(newRecordIds[0]);
            uiBuilder.text(`📝 示例记录 ID: ${newRecordIds[0]}`);
            if (mainFieldId && sampleRecord.fields[mainFieldId]) {
              const val = sampleRecord.fields[mainFieldId];
              if (isAttachmentArray(val)) {
                uiBuilder.text(`✅ 主图字段包含 ${val.length} 个附件`);
                if (val.length) uiBuilder.text(`   示例附件: ${val[0].name} (${val[0].file_token})`);
              } else {
                uiBuilder.text(`⚠️ 主图字段值类型异常: ${JSON.stringify(val)}`);
              }
            }
          }
        }

        uiBuilder.hideLoading();
        uiBuilder.text(`✅ 成功写入 ${added} 条记录，共上传 ${records.reduce((s, r) => {
          let cnt = 0;
          if (mainFieldId && r.fields[mainFieldId]) cnt += r.fields[mainFieldId].length;
          if (carouselFieldId && r.fields[carouselFieldId]) cnt += r.fields[carouselFieldId].length;
          if (aplusFieldId && r.fields[aplusFieldId]) cnt += r.fields[aplusFieldId].length;
          return s + cnt;
        }, 0)} 张图片`);
      } catch (err: any) {
        uiBuilder.hideLoading();
        uiBuilder.text(`❌ 错误: ${err.message}`);
        console.error(err);
      }
    }
  );
}