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
function isAttachmentArray(value: any): value is Array<{ file_token: string }> {
  return Array.isArray(value) && value.every(item => item && typeof item.file_token === 'string');
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

        // 批量上传函数
        async function uploadBatch(files: File[]): Promise<Map<File, string>> {
          const BATCH = 20;
          const tokenMap = new Map<File, string>();
          for (let i = 0; i < files.length; i += BATCH) {
            const batch = files.slice(i, i + BATCH);
            const tokens = await bitable.base.batchUploadFile(batch);
            for (let j = 0; j < batch.length; j++) {
              tokenMap.set(batch[j], tokens[j]);
            }
          }
          return tokenMap;
        }

        const records = [];
        for (const folder of folders) {
          const fileList = folderMap.get(folder)!;
          const main = fileList.filter(f => f.name.toLowerCase().includes('主图'));
          const carousel = fileList.filter(f => f.name.toLowerCase().includes('轮播图'));
          const aplus = fileList.filter(f => f.name.toLowerCase().includes('a+'));

          const all = [...main, ...carousel, ...aplus];
          if (all.length === 0) continue;

          const tokenMap = await uploadBatch(all);
          const build = (files: File[]) => files.map(f => ({ file_token: tokenMap.get(f) })).filter(v => v.file_token);

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

        // 写入第一条记录作为测试，并立即读取验证
        const BATCH_REC = 500;
        let added = 0;
        for (let i = 0; i < records.length; i += BATCH_REC) {
          const batch = records.slice(i, i + BATCH_REC);
          const newRecordIds = await table.addRecords(batch);
          added += batch.length;

          // 调试：读取第一条写入的记录，验证附件字段
          if (i === 0 && newRecordIds.length > 0) {
            const sampleId = newRecordIds[0];
            const sampleRecord = await table.getRecordById(sampleId);
            uiBuilder.text(`📝 示例记录 ID: ${sampleId}`);
            if (mainFieldId && sampleRecord.fields[mainFieldId]) {
              const val = sampleRecord.fields[mainFieldId];
              if (isAttachmentArray(val)) {
                uiBuilder.text(`✅ 主图字段包含 ${val.length} 个附件 token`);
                // 可选：打印第一个 token
                if (val.length) uiBuilder.text(`   第一个 token: ${val[0].file_token}`);
              } else {
                uiBuilder.text(`⚠️ 主图字段值不是预期的附件数组: ${JSON.stringify(val)}`);
              }
            }
            if (carouselFieldId && sampleRecord.fields[carouselFieldId]) {
              const val = sampleRecord.fields[carouselFieldId];
              if (isAttachmentArray(val)) {
                uiBuilder.text(`✅ 轮播图字段包含 ${val.length} 个附件`);
              }
            }
            if (aplusFieldId && sampleRecord.fields[aplusFieldId]) {
              const val = sampleRecord.fields[aplusFieldId];
              if (isAttachmentArray(val)) {
                uiBuilder.text(`✅ A+ 字段包含 ${val.length} 个附件`);
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