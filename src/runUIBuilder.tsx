//@ts-nocheck
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
  // 【原版界面完全保留】选择表格和附件字段
  const { table, field } = await new Promise<{ table: any; field: any }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.tableSelect("table", { label: "目标表格" }),
          form.fieldSelect("field", {
            label: "附件字段",
            sourceTable: "table",
            filterByTypes: [17],
          }),
        ],
        buttons: ["确认"],
      }),
      (args) => {
        resolve({ table: args.values.table, field: args.values.field });
      }
    );
  });

  if (!table || !field) {
    uiBuilder.text("❌ 未选择表格或附件字段");
    return;
  }

  uiBuilder.text(`已选择字段: ${field.name} (ID: ${field.id})`);

  // 【原版按钮完全保留】选择图片并上传
  uiBuilder.buttons("", ["选择图片并上传"], async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    // 修复：属性赋值，解决语法报错
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
      const fileArray = Array.from(files);
      // 原版批量上传逻辑
      allTokens = await batchUploadFiles(fileArray, (files) => bitable.base.batchUploadFile(files));

      if (allTokens.length === 0) {
        throw new Error("未获取到任何 file_token");
      }

      // 修复：正确赋值格式，兼容多维表格附件/图片字段
      const attachmentValue = allTokens.map((token) => ({ file_token: token }));

      // 写入记录
      await table.addRecord({
        fields: {
          [field.id]: attachmentValue,
        },
      });

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 成功！已将 ${allTokens.length} 张图片添加到记录`);
    } catch (error: any) {
      uiBuilder.hideLoading();
      const errorMsg = error?.message || String(error);
      uiBuilder.text(`❌ 失败：${errorMsg}`);
      console.error("详细错误:", error);
    }
  });
}