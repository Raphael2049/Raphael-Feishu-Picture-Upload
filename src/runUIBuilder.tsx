// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

/**
 * 分批上传文件（每批最多 20 个）
 */
async function batchUploadFiles(
  files: File[],
  batchUploadFn: (files: File[]) => Promise<string[]>
): Promise<string[]> {
  const BATCH_SIZE = 20;
  const allTokens: string[] = [];
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const tokens = await batchUploadFn(batch);
    allTokens.push(...tokens);
  }
  return allTokens;
}

export default async function main(uiBuilder: UIBuilder, { t }: { t: (key: string) => string }) {
  uiBuilder.form(
    (form) => ({
      formItems: [
        form.tableSelect("tableId", { label: "选择目标表格" }),
        form.fieldSelect("fieldId", {
          label: "选择附件字段（用于存放图片）",
          sourceTable: "tableId",
          filterByTypes: [17], // 17 = Attachment 类型
        }),
      ],
      buttons: ["下一步 → 选择图片并上传"],
    }),
    async ({ key, values }: { key: string; values: any }) => {
      const tableId = values.tableId as string;
      const fieldId = values.fieldId as string;
      if (!tableId || !fieldId) {
        uiBuilder.text("请先选择表格和附件字段");
        return;
      }

      const table = await bitable.base.getTableById(tableId);
      await table.getFieldById(fieldId); // 仅验证字段存在

      // 弹出文件选择框
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.multiple = true;
      fileInput.accept = "image/*";
      document.body.appendChild(fileInput);

      const files = await new Promise<FileList>((resolve) => {
        fileInput.onchange = () => {
          if (fileInput.files) resolve(fileInput.files);
          document.body.removeChild(fileInput);
        };
        fileInput.click();
      });

      if (!files.length) {
        uiBuilder.text("未选择任何图片，已取消操作");
        return;
      }

      uiBuilder.showLoading(`正在上传 ${files.length} 张图片...`);

      try {
        const fileTokens = await batchUploadFiles(Array.from(files), (batch) =>
          bitable.base.batchUploadFile(batch)
        );

        const attachmentValue = fileTokens.map((token) => ({ file_token: token }));

        // 创建新记录，写入附件字段
        await table.addRecord({
          fields: {
            [fieldId]: attachmentValue,
          } as any, // 类型断言解决索引签名问题
        });

        uiBuilder.hideLoading();
        uiBuilder.text(`✅ 成功！已将 ${files.length} 张图片添加到一条新记录中。`);
      } catch (error: any) {
        uiBuilder.hideLoading();
        uiBuilder.text(`❌ 上传失败：${error.message}`);
        console.error(error);
      }
    }
  );
}