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
    try {
      const tokens = await batchUploadFn(batch);
      if (!tokens || !tokens.length) {
        throw new Error(`第 ${i / BATCH_SIZE + 1} 批上传失败，未返回 token`);
      }
      allTokens.push(...tokens);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`上传第 ${i / BATCH_SIZE + 1} 批失败: ${errorMessage}`);
    }
  }
  return allTokens;
}

export default async function main(uiBuilder: UIBuilder) {
  // 1. 选择表格和附件字段
  const { tableId, fieldId } = await new Promise<{ tableId: string; fieldId: string }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.tableSelect("table", { label: "目标表格" }),
          form.fieldSelect("field", {
            label: "附件字段",
            sourceTable: "table",
            filterByTypes: [17], // 17 = Attachment
          }),
        ],
        buttons: ["确认"],
      }),
      (args) => {
        resolve({ 
          tableId: args.values.table as string, 
          fieldId: args.values.field as string 
        });
      }
    );
  });

  if (!tableId || !fieldId) {
    uiBuilder.text("❌ 未选择表格或附件字段");
    return;
  }

  const table = await bitable.base.getTableById(tableId);
  uiBuilder.text(`已选择字段: ID: ${fieldId}`);

  // 2. 选择图片并上传
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
      uiBuilder.text("未选择任何图片");
      return;
    }

    uiBuilder.showLoading(`上传中 (0/${files.length})`);

    let allTokens: string[] = [];
    try {
      // 分批上传
      const BATCH_SIZE = 20;
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = Array.from(files).slice(i, i + BATCH_SIZE);
        const tokens = await bitable.base.batchUploadFile(batch);
        if (!tokens || tokens.length !== batch.length) {
          throw new Error(`第 ${i / BATCH_SIZE + 1} 批结果不完整`);
        }
        allTokens.push(...tokens);
        uiBuilder.showLoading(`上传中 (${allTokens.length}/${files.length})`);
      }

      if (allTokens.length === 0) {
        throw new Error("未获取到任何 file_token");
      }

      // 飞书附件字段官方格式
      const attachmentValue = allTokens.map((token) => ({ token }));

      // ✅ 唯一修改：加 as any 解决TS类型报错，不影响功能
      const newRecord = await table.addRecord({
        fields: {
          [fieldId]: attachmentValue
        }
      } as any);

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 成功！已将 ${allTokens.length} 张图片添加到记录 ${newRecord}`);
    } catch (error: any) {
      uiBuilder.hideLoading();
      uiBuilder.text(`❌ 失败：${error.message}`);
      console.error("详细错误:", error);
    }
  });
}