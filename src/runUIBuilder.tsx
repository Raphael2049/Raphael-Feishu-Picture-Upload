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
  const { tableId, fieldId } = await new Promise<{ tableId: string; fieldId: string }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.tableSelect("tableId", { label: "选择目标表格" }),
          form.fieldSelect("fieldId", {
            label: "选择附件字段（用于存放图片）",
            sourceTable: "tableId",
            filterByTypes: [17],
          }),
        ],
        buttons: ["确认选择"],
      }),
      (args) => {
        // 注意：tableSelect 和 fieldSelect 的值是 { id, name } 对象，需要提取 id
        const rawTableId = args.values.tableId;
        const rawFieldId = args.values.fieldId;
        // 使用 as any 绕过类型检查
        const tableId = rawTableId && typeof rawTableId === 'object' ? (rawTableId as any).id : rawTableId;
        const fieldId = rawFieldId && typeof rawFieldId === 'object' ? (rawFieldId as any).id : rawFieldId;
        resolve({ tableId, fieldId });
      }
    );
  });

  if (!tableId || !fieldId) {
    uiBuilder.text("未选择表格或附件字段，已取消");
    return;
  }

  let table: any;
  try {
    table = await bitable.base.getTableById(tableId);
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取表格 (${tableId})：${error.message}\n请确保表格存在且当前应用有访问权限。`);
    return;
  }

  try {
    await table.getFieldById(fieldId);
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取附件字段 (${fieldId})：${error.message}\n请确保该字段是附件类型且未被删除。`);
    return;
  }

  uiBuilder.buttons("", ["选择图片并上传"], async () => {
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

      await table.addRecord({
        fields: {
          [fieldId]: attachmentValue,
        } as any,
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