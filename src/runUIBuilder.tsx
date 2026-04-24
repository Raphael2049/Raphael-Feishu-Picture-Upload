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
      // 调试：告知用户回调已触发
      uiBuilder.text('正在准备文件选择器，请稍候...');

      try {
        // 断言 values
        const vals = values as any;
        const {
          tableId,
          matchFieldId,
          mainImageFieldId,
          carouselFieldId,
          aplusFieldId,
        } = vals;

        if (!tableId) {
          uiBuilder.text('❌ 未选择目标表格');
          return;
        }

        // 获取表格实例
        const table = await bitable.base.getTableById(tableId);

        // 创建文件选择器（支持文件夹）
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.webkitdirectory = true;  // 启用文件夹选择
        fileInput.multiple = true;
        // 确保存在于 DOM 树中（有些浏览器要求）
        document.body.appendChild(fileInput);

        // 等待用户选择文件夹
        const files = await new Promise<FileList>((resolve, reject) => {
          fileInput.onchange = () => {
            if (fileInput.files && fileInput.files.length > 0) {
              resolve(fileInput.files);
            } else {
              reject(new Error('未选择任何文件夹'));
            }
            document.body.removeChild(fileInput);
          };
          // 如果用户取消选择，应该 reject 但无法直接捕获，可设置超时
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
          if (parts.length < 2) continue; // 忽略根目录文件
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

        // 分批上传文件
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

        // 批量写入记录
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