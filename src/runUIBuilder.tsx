// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

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
  // 第一步：选择表格和附件字段
  const { tableId, fieldId } = await new Promise<{ tableId: string; fieldId: string }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.tableSelect("tableId", { label: "选择目标表格" }),
          form.fieldSelect("fieldId", {
            label: "选择附件字段（用于存放图片）",
            sourceTable: "tableId",
            filterByTypes: [17], // 附件字段类型
          }),
        ],
        buttons: ["确认选择"],
      }),
      (args) => {
        // 注意：args 的类型为 { key: string; values: Record<string, unknown> }
        const tableId = args.values.tableId as string;
        const fieldId = args.values.fieldId as string;
        resolve({ tableId, fieldId });
      }
    );
  });

  if (!tableId || !fieldId) {
    uiBuilder.text("未选择表格或附件字段，已取消");
    return;
  }

  // 第二步：显示“选择图片并上传”按钮（确保用户直接交互）
  uiBuilder.buttons("", ["选择图片并上传"], async () => {
    // 创建文件选择器
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
      fileInput.click(); // 用户点击按钮后立即调用，符合安全策略
    });

    if (!files.length) {
      uiBuilder.text("未选择任何图片，已取消");
      return;
    }

    uiBuilder.showLoading(`正在上传 ${files.length} 张图片...`);

    try {
      const table = await bitable.base.getTableById(tableId);
      const field = await table.getFieldById(fieldId); // 验证字段存在

      // 分批上传图片，获取 file_token 列表
      const fileTokens = await batchUploadFiles(Array.from(files), (batch) =>
        bitable.base.batchUploadFile(batch)
      );

      // 构造附件字段的值
      const attachmentValue = fileTokens.map((token) => ({ file_token: token }));

      // 创建一条新记录，将图片写入附件字段
      await table.addRecord({
        fields: {
          [fieldId]: attachmentValue,
        } as any, // 类型断言解决索引签名兼容问题
      });

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 成功！已将 ${files.length} 张图片添加到一条新记录中。`);
    } catch (error: any) {
      uiBuilder.hideLoading();
      uiBuilder.text(`❌ 上传失败：${error.message}`);
      console.error(error);
    }
  });
}