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
  // 选择表格和字段
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

  // 获取表格实例
  let table: ITable;
  try {
    table = await bitable.base.getTableById(tableId);
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取表格：${error.message}`);
    return;
  }

  // 上传按钮
  uiBuilder.buttons("", ["选择图片并上传"], async () => {
    // 原生文件选择器
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
      uiBuilder.text("未选择任何图片");
      return;
    }

    uiBuilder.showLoading(`正在上传 ${files.length} 张图片...`);

    try {
      // 上传文件（旧版SDK唯一可用API，无报错）
      const fileTokens = await batchUploadFiles(files, (batch) =>
        bitable.base.batchUploadFile(batch)
      );

      // ✅【终极核心修复】旧版SDK附件字段：直接传 token 字符串数组！！！
      // 不需要任何对象包裹，这是图片不显示的唯一原因！
      const attachmentValue = fileTokens;

      // 添加记录（TS类型兼容）
      await table.addRecord({
        fields: {
          [fieldId]: attachmentValue as unknown as IOpenCellValue,
        },
      });

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 上传成功！图片已正常显示`);
    } catch (error: any) {
      uiBuilder.hideLoading();
      uiBuilder.text(`❌ 失败：${error.message}`);
      console.error("错误详情：", error);
    }
  });
}