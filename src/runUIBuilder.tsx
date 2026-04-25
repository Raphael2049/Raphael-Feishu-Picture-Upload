// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

// 辅助函数：统一提取字段ID
function ensureId(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if ('id' in value) return value.id;
    if ('fieldId' in value) return value.fieldId;
  }
  return String(value);
}

export default async function main(uiBuilder: UIBuilder, { t }: any) {
  // 正确用法：form 接受两个参数，第二个参数是回调
  uiBuilder.form(
    (form) => ({
      formItems: [
        form.tableSelect('tableId', { label: '选择目标表格' }),
        form.fieldSelect('matchFieldId', {
          label: '匹配字段（子文件夹名 → 写入此文本字段）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [1],
        }),
        form.fieldSelect('mainFieldId', {
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
        const matchFieldId = ensureId(vals.matchFieldId);
        const mainFieldId = ensureId(vals.mainFieldId);
        const carouselFieldId = ensureId(vals.carouselFieldId);
        const aplusFieldId = ensureId(vals.aplusFieldId);

        if (!tableId) throw new Error('未选择表格');
        const table = await bitable.base.getTableById(tableId);
        uiBuilder.text(`✅ 表格: ${await table.getName()}`);

        // 验证字段存在性（可选，可增强）
        const fieldMetaList = await table.getFieldMetaList();
        const fieldIds = fieldMetaList.map(f => f.id);
        if (matchFieldId && !fieldIds.includes(matchFieldId)) throw new Error('匹配字段不存在');
        if (mainFieldId && !fieldIds.includes(mainFieldId)) throw new Error('主图字段不存在');
        if (carouselFieldId && !fieldIds.includes(carouselFieldId)) throw new Error('轮播图字段不存在');
        if (aplusFieldId && !fieldIds.includes(aplusFieldId)) throw new Error('A+ 字段不存在');

        // ========== 选择父文件夹（支持子文件夹） ==========
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.webkitdirectory = true;   // 允许选择文件夹
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
          uiBuilder.text('未选择任何文件夹');
          return;
        }

        // 解析子文件夹结构：子文件夹名 → 文件数组
        const folderMap = new Map<string, File[]>();
        for (const file of Array.from(files)) {
          const relPath = (file as any).webkitRelativePath;
          if (!relPath) continue;
          const parts = relPath.split('/');
          if (parts.length < 2) continue;
          const folderName = parts[0];
          if (!folderMap.has(folderName)) folderMap.set(folderName, []);
          folderMap.get(folderName)!.push(file);
        }

        const folders = Array.from(folderMap.keys());
        if (folders.length === 0) {
          uiBuilder.text('所选文件夹中没有子文件夹，请确保每个产品对应一个子文件夹');
          return;
        }

        uiBuilder.showLoading(`正在处理 ${folders.length} 个产品（子文件夹）...`);

        // ========== 分批上传图片，返回完整附件对象 ==========
        async function uploadBatch(files: File[]): Promise<Array<{ file_token: string; name: string; size: number; type: string }>> {
          const BATCH_SIZE = 20;
          const results: Array<{ file_token: string; name: string; size: number; type: string }> = [];
          for (let i = 0; i < files.length; i += BATCH_SIZE) {
            const batch = files.slice(i, i + BATCH_SIZE);
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
          const allFiles = folderMap.get(folder)!;
          // 按文件名关键词分类
          const mainFiles = allFiles.filter(f => f.name.toLowerCase().includes('主图'));
          const carouselFiles = allFiles.filter(f => f.name.toLowerCase().includes('轮播图'));
          const aplusFiles = allFiles.filter(f => f.name.toLowerCase().includes('a+'));

          const filesToUpload = [...mainFiles, ...carouselFiles, ...aplusFiles];
          if (filesToUpload.length === 0) continue;

          const uploaded = await uploadBatch(filesToUpload);
          // 建立 File -> 附件对象的映射
          const fileToAtt = new Map<File, typeof uploaded[0]>();
          for (let i = 0; i < filesToUpload.length; i++) {
            fileToAtt.set(filesToUpload[i], uploaded[i]);
          }

          const build = (files: File[]) => files.map(f => fileToAtt.get(f)).filter(v => v && v.file_token);

          const fields: any = {};
          if (matchFieldId) fields[matchFieldId] = folder;
          if (mainFieldId && mainFiles.length) fields[mainFieldId] = build(mainFiles);
          if (carouselFieldId && carouselFiles.length) fields[carouselFieldId] = build(carouselFiles);
          if (aplusFieldId && aplusFiles.length) fields[aplusFieldId] = build(aplusFiles);

          records.push({ fields });
        }

        if (records.length === 0) {
          uiBuilder.text('没有可写入的记录（所有子文件夹均无符合条件的图片）');
          uiBuilder.hideLoading();
          return;
        }

        // ========== 批量写入表格 ==========
        const BATCH_RECORD = 500;
        let added = 0;
        for (let i = 0; i < records.length; i += BATCH_RECORD) {
          const batch = records.slice(i, i + BATCH_RECORD);
          const newIds = await table.addRecords(batch);
          added += batch.length;
          // 调试：输出第一条记录的附件情况
          if (i === 0 && newIds.length > 0) {
            const sample = await table.getRecordById(newIds[0]);
            uiBuilder.text(`📝 示例记录 ID: ${newIds[0]}`);
            if (mainFieldId && sample.fields[mainFieldId]) {
              const atts = sample.fields[mainFieldId] as any[];
              uiBuilder.text(`✅ 主图字段包含 ${atts.length} 个附件，第一个名称: ${atts[0]?.name || '无'}`);
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
        }, 0)} 张图片。请刷新表格查看。`);
      } catch (err: any) {
        uiBuilder.hideLoading();
        uiBuilder.text(`❌ 错误: ${err.message || err}`);
        console.error(err);
      }
    }
  );
}