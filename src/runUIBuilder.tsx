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
  // 第一步：选择表格和附件字段（注意：返回值是对象，包含 id, name 等属性）
  const { table, field } = await new Promise<{ table: any; field: any }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.tableSelect("table", { label: "选择目标表格" }),
          form.fieldSelect("field", {
            label: "选择附件字段（用于存放图片）",
            sourceTable: "table",
            filterByTypes: [17], // 17 = Attachment 类型
          }),
        ],
        buttons: ["确认选择"],
      }),
      (args) => {
        // 官方文档：values.table 和 values.field 已经是对象，无需再次调用 getTableById
        const table = args.values.table;
        const field = args.values.field;
        resolve({ table, field });
      }
    );
  });

  if (!table || !field) {
    uiBuilder.text("未选择表格或附件字段，已取消");
    return;
  }

  // 第二步：显示“选择图片并上传”按钮（用户必须直接点击）
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
      // 上传图片，批量获取 file_token
      const fileTokens = await batchUploadFiles(Array.from(files), (batch) =>
        bitable.base.batchUploadFile(batch)
      );

      if (!fileTokens.length) {
        throw new Error("上传失败，未获取到 file_token");
      }

      // 附件字段的值格式：数组，每个元素为 { file_token: "xxx" }
      const attachmentValue = fileTokens.map((token) => ({ file_token: token }));

      // 创建新记录，写入附件字段（注意使用 field.id）
      const recordId = await table.addRecord({
        fields: {
          [field.id]: attachmentValue,
        },
      });

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 成功！已将 ${files.length} 张图片添加到新记录 (ID: ${recordId}) 中。`);
    } catch (error: any) {
      uiBuilder.hideLoading();
      uiBuilder.text(`❌ 上传或写入失败：${error.message}`);
      console.error(error);
    }
  });
}