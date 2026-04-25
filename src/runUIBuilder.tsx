// src/runUIBuilder.tsx
import { bitable, UIBuilder, ITable, IOpenCellValue } from "@lark-base-open/js-sdk";

// 分批上传
async function batchUploadFiles(
  files: File[],
  uploadFn: (files: File[]) => Promise<string[]>
): Promise<string[]> {
  const BATCH_SIZE = 20;
  const tokens: string[] = [];
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const t = await uploadFn(batch);
    tokens.push(...t);
  }
  return tokens;
}

export default async function main(uiBuilder: UIBuilder, { t }: { t: (key: string) => string }) {
  // 1. 选择表格&字段
  const { tableId, fieldId } = await new Promise<{ tableId: string; fieldId: string }>((resolve) => {
    uiBuilder.form((form) => ({
      formItems: [
        form.tableSelect("tableId", { label: "选择目标表格" }),
        form.fieldSelect("fieldId", {
          label: "选择附件字段",
          sourceTable: "tableId",
          filterByTypes: [17],
        }),
      ],
      buttons: ["确认"],
    }), (args) => {
      const tableId = (args.values.tableId as { id: string }).id;
      const fieldId = (args.values.fieldId as { id: string }).id;
      resolve({ tableId, fieldId });
    });
  });

  if (!tableId || !fieldId) return uiBuilder.text("未选择");

  // 2. 获取表格
  const table: ITable = await bitable.base.getTableById(tableId);

  // 3. 上传按钮
  uiBuilder.buttons("", ["选择图片"], async () => {
    // 原生文件选择
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.style.display = "none";
    document.body.appendChild(input);

    const files = await new Promise<File[] | null>((res) => {
      input.onchange = () => {
        const f = input.files ? Array.from(input.files) : null;
        document.body.removeChild(input);
        res(f);
      };
      input.click();
    });

    if (!files?.length) return uiBuilder.text("未选图片");

    uiBuilder.showLoading("上传中...");
    try {
      // ==============================================
      // ✅【核心终极修复】旧版SDK 必须传 tableId！
      // 类型断言绕过TS报错（旧版类型定义缺失，API真实需要）
      // ==============================================
      const fileTokens = await batchUploadFiles(files, (batch) => 
        (bitable.base.batchUploadFile as any)(batch, tableId)
      );

      console.log("上传成功token：", fileTokens); // 调试日志

      // ==============================================
      // ✅ 赋值格式：纯字符串数组（旧版唯一标准）
      // ==============================================
      await table.addRecord({
        fields: {
          [fieldId]: fileTokens as unknown as IOpenCellValue,
        },
      });

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 成功！上传 ${fileTokens.length} 张图片`);
    } catch (e: any) {
      uiBuilder.hideLoading();
      uiBuilder.text(`❌ 错误：${e.message}`);
      console.error("报错：", e);
    }
  });
}