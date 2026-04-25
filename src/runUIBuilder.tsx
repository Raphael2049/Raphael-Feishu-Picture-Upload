// src/runUIBuilder.tsx
import { bitable, UIBuilder, ITable, IOpenCellValue } from "@lark-base-open/js-sdk";

// 分批上传工具函数
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
  // 修复TS类型：正确提取选择器ID
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
        const tableId = (args.values.tableId as { id: string }).id;
        const fieldId = (args.values.fieldId as { id: string }).id;
        resolve({ tableId, fieldId });
      }
    );
  });

  if (!tableId || !fieldId) {
    uiBuilder.text("未选择表格或附件字段，已取消");
    return;
  }

  // 显式声明table类型
  let table: ITable;
  try {
    table = await bitable.base.getTableById(tableId);
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取表格 (${tableId})：${error.message}`);
    return;
  }

  try {
    await table.getFieldById(fieldId);
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取附件字段 (${fieldId})：${error.message}`);
    return;
  }

  // 上传按钮逻辑
  uiBuilder.buttons("", ["选择图片并上传"], async () => {
    // 原生DOM文件选择器（旧版SDK兼容）
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*";
    document.body.appendChild(fileInput);

    const files = await new Promise<File[] | null>((resolve) => {
      fileInput.onchange = () => {
        const fileList = fileInput.files;
        document.body.removeChild(fileInput);
        resolve(fileList ? Array.from(fileList) : null);
      };
      fileInput.click();
    });

    if (!files || files.length === 0) {
      uiBuilder.text("未选择任何图片，已取消操作");
      return;
    }

    uiBuilder.showLoading(`正在上传 ${files.length} 张图片...`);

    try {
      // 旧版SDK上传文件
      const fileTokens = await batchUploadFiles(files, (batch) =>
        bitable.base.batchUploadFile(batch)
      );

      // 附件格式（标准正确格式）
      const attachmentValue = fileTokens.map((token) => ({ fileToken: token }));

      // ✅ 核心修复：加类型断言，解决TS重载报错
      await table.addRecord({
        fields: {
          [fieldId]: attachmentValue as unknown as IOpenCellValue,
        },
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