// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

export default async function main(uiBuilder: UIBuilder, { t }: any) {
  uiBuilder.form(
    (form) => ({
      formItems: [
        form.tableSelect('tableId', { label: '选择目标表格' }),
        form.fieldSelect('matchFieldId', {
          label: '匹配字段（子文件夹名将写入此字段）',
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
      uiBuilder.text('正在准备文件选择器，请稍候...');

      try {
        const vals = values as any;
        let {
          tableId,
          matchFieldId,
          mainImageFieldId,
          carouselFieldId,
          aplusFieldId,
        } = vals;

        // 调试：打印原始值
        console.log('原始 values:', vals);
        uiBuilder.text(`原始 tableId 类型: ${typeof tableId}, 值: ${JSON.stringify(tableId)}`);

        // 如果 tableId 是对象，提取 id 属性
        if (tableId && typeof tableId === 'object' && 'id' in tableId) {
          tableId = tableId.id;
          uiBuilder.text(`转换后 tableId: ${tableId}`);
        }

        if (!tableId) {
          uiBuilder.text('❌ 未选择目标表格，请返回并重新选择');
          return;
        }

        // 检查表格是否存在
        const exists = await bitable.base.isTableExist(tableId);
        if (!exists) {
          uiBuilder.text(`❌ 表格不存在（ID: ${tableId}），请检查权限或重新选择`);
          return;
        }

        const table = await bitable.base.getTableById(tableId);
        uiBuilder.text(`✅ 成功获取表格: ${await table.getName()}`);

        // 创建文件夹选择器
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

        // 解析文件夹结构
        const folderMap = new Map<string, File[]>();
        for (const file of Array.from(files)) {
          const relativePath = (file as any).webkitRelativePath as string;
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
            fields: {
              [matchFieldId]: subFolderName,
            },
          };
          if (mainImages.length) {
            record.fields[mainImageFieldId] = buildAttachmentValue(mainImages);
          }
          if (carouselImages.length) {
            record.fields[carouselFieldId] = buildAttachmentValue(carouselImages);
          }
          if (aplusImages.length) {
            record.fields[aplusFieldId] = buildAttachmentValue(aplusImages);
          }

          recordsToAdd.push(record);
        }

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