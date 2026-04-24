// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

// 将可能为对象 { id: "xxx" } 的值转为字符串ID
function ensureId(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'id' in value) return value.id;
  if (typeof value === 'object' && 'fieldId' in value) return value.fieldId;
  return String(value);
}

export default async function main(uiBuilder: UIBuilder, { t }: any) {
  uiBuilder.form(
    (form) => ({
      formItems: [
        form.tableSelect('tableId', { label: '选择目标表格' }),
        form.fieldSelect('matchFieldId', {
          label: '匹配字段（子文件夹名将写入此字段）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [1], // 文本类型
        }),
        form.fieldSelect('mainImageFieldId', {
          label: '主图字段（附件）',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [17], // 附件类型
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
      uiBuilder.text('正在准备文件选择器，请稍候...');

      try {
        const vals = values as any;
        let rawTableId = vals.tableId;
        let rawMatchFieldId = vals.matchFieldId;
        let rawMainImageFieldId = vals.mainImageFieldId;
        let rawCarouselFieldId = vals.carouselFieldId;
        let rawAplusFieldId = vals.aplusFieldId;

        // 打印原始值以便调试
        console.log('原始表单值:', vals);

        // 转换ID
        const tableId = ensureId(rawTableId);
        if (!tableId) {
          uiBuilder.text('❌ 未选择目标表格，请返回并重新选择');
          return;
        }

        // 验证表格是否存在
        const tableExists = await bitable.base.isTableExist(tableId);
        if (!tableExists) {
          uiBuilder.text(`❌ 表格不存在（ID: ${tableId}），请检查权限或重新选择`);
          return;
        }

        const table = await bitable.base.getTableById(tableId);
        uiBuilder.text(`✅ 成功获取表格: ${await table.getName()}`);

        // 转换字段ID
        const matchFieldId = ensureId(rawMatchFieldId);
        const mainImageFieldId = ensureId(rawMainImageFieldId);
        const carouselFieldId = ensureId(rawCarouselFieldId);
        const aplusFieldId = ensureId(rawAplusFieldId);

        // 验证字段是否存在
        const fieldIdList = await table.getFieldIdList();
        if (matchFieldId && !fieldIdList.includes(matchFieldId)) {
          uiBuilder.text(`❌ 匹配字段 ${matchFieldId} 不存在于表格中，请重新选择`);
          return;
        }
        if (mainImageFieldId && !fieldIdList.includes(mainImageFieldId)) {
          uiBuilder.text(`❌ 主图字段 ${mainImageFieldId} 不存在于表格中，请重新选择`);
          return;
        }
        if (carouselFieldId && !fieldIdList.includes(carouselFieldId)) {
          uiBuilder.text(`❌ 轮播图字段 ${carouselFieldId} 不存在于表格中，请重新选择`);
          return;
        }
        if (aplusFieldId && !fieldIdList.includes(aplusFieldId)) {
          uiBuilder.text(`❌ A+ 字段 ${aplusFieldId} 不存在于表格中，请重新选择`);
          return;
        }

        // 文件夹选择器（支持子文件夹）
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.webkitdirectory = true;
        fileInput.multiple = true;
        document.body.appendChild(fileInput);

        const files = await new Promise<FileList>((resolve, reject) => {
          fileInput.onchange = () => {
            if (fileInput.files && fileInput.files.length > 0) {
              resolve(fileInput.files);
            } else {
              reject(new Error('未选择任何文件夹'));
            }
            document.body.removeChild(fileInput);
          };
          fileInput.click();
        });

        if (!files.length) {
          uiBuilder.text('未选择任何文件夹，操作已取消');
          return;
        }

        // 解析文件夹结构：按子文件夹分组
        const folderMap = new Map<string, File[]>();
        for (const file of Array.from(files)) {
          const relativePath = (file as any).webkitRelativePath;
          if (!relativePath) continue;
          const parts = relativePath.split('/');
          if (parts.length < 2) continue;
          const subFolderName = parts[0];
          if (!folderMap.has(subFolderName)) {
            folderMap.set(subFolderName, []);
          }
          folderMap.get(subFolderName)!.push(file);
        }

        const subFolders = Array.from(folderMap.keys());
        if (subFolders.length === 0) {
          uiBuilder.text('所选文件夹中没有子文件夹，请确保每个记录对应一个子文件夹');
          return;
        }

        uiBuilder.showLoading(`正在处理 ${subFolders.length} 个产品，请稍候...`);

        // 分批上传文件（每批最多20个）
        async function uploadFilesInBatches(
          fileList: File[]
        ): Promise<{ file: File; token: string }[]> {
          const BATCH_SIZE = 20;
          const results: { file: File; token: string }[] = [];
          for (let i = 0; i < fileList.length; i += BATCH_SIZE) {
            const batch = fileList.slice(i, i + BATCH_SIZE);
            const tokens = await bitable.base.batchUploadFile(batch);
            for (let j = 0; j < batch.length; j++) {
              results.push({ file: batch[j], token: tokens[j] });
            }
          }
          return results;
        }

        const recordsToAdd: any[] = [];

        for (const subFolderName of subFolders) {
          const filesInFolder = folderMap.get(subFolderName)!;

          // 按文件名关键词分类
          const mainImages: File[] = [];
          const carouselImages: File[] = [];
          const aplusImages: File[] = [];

          for (const file of filesInFolder) {
            const fileName = file.name.toLowerCase();
            if (fileName.includes('主图')) {
              mainImages.push(file);
            } else if (fileName.includes('轮播图')) {
              carouselImages.push(file);
            } else if (fileName.includes('a+')) {
              aplusImages.push(file);
            }
          }

          const allFiles = [...mainImages, ...carouselImages, ...aplusImages];
          if (allFiles.length === 0) continue;

          const uploaded = await uploadFilesInBatches(allFiles);
          const tokenMap = new Map<File, string>();
          for (const { file, token } of uploaded) {
            tokenMap.set(file, token);
          }

          const buildAttachmentValue = (images: File[]) =>
            images.map((img) => ({ file_token: tokenMap.get(img) }));

          const record: any = {
            fields: {}
          };
          if (matchFieldId) {
            record.fields[matchFieldId] = subFolderName;
          }
          if (mainImageFieldId && mainImages.length) {
            record.fields[mainImageFieldId] = buildAttachmentValue(mainImages);
          }
          if (carouselFieldId && carouselImages.length) {
            record.fields[carouselFieldId] = buildAttachmentValue(carouselImages);
          }
          if (aplusFieldId && aplusImages.length) {
            record.fields[aplusFieldId] = buildAttachmentValue(aplusImages);
          }

          if (Object.keys(record.fields).length > 0) {
            recordsToAdd.push(record);
          }
        }

        // 批量写入
        const BATCH_RECORD_SIZE = 500;
        let successCount = 0;
        for (let i = 0; i < recordsToAdd.length; i += BATCH_RECORD_SIZE) {
          const batch = recordsToAdd.slice(i, i + BATCH_RECORD_SIZE);
          await table.addRecords(batch);
          successCount += batch.length;
        }

        uiBuilder.hideLoading();
        uiBuilder.text(
          `✅ 上传完成！共处理 ${subFolders.length} 个子文件夹，成功写入 ${successCount} 条记录。`
        );
      } catch (err: any) {
        uiBuilder.hideLoading();
        uiBuilder.text(`❌ 发生错误：${err.message || err}`);
        console.error(err);
      }
    }
  );
}