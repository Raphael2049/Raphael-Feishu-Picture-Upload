// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

/**
 * 分批上传文件，每批最多 20 个
 */
async function batchUploadFiles(
  files: File[],
  batchUploadFn: (files: File[]) => Promise<string[]>
): Promise<string[]> {
  const BATCH_SIZE = 20;
  const allTokens: string[] = [];
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    console.log(`上传第 ${i / BATCH_SIZE + 1} 批，共 ${batch.length} 个文件`);
    const tokens = await batchUploadFn(batch);
    console.log('本批返回 tokens:', tokens);
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
            filterByTypes: [17], // 17 = Attachment 类型
          }),
        ],
        buttons: ["确认选择"],
      }),
      (args) => {
        const rawTableId = args.values.tableId;
        const rawFieldId = args.values.fieldId;
        // 提取 id（表单返回的是 { id, name } 对象）
        const tableId = rawTableId && typeof rawTableId === 'object' ? (rawTableId as any).id : rawTableId;
        const fieldId = rawFieldId && typeof rawFieldId === 'object' ? (rawFieldId as any).id : rawFieldId;
        console.log('用户选择的 tableId:', tableId, 'fieldId:', fieldId);
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
    console.log('成功获取表格对象');
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取表格 (${tableId})：${error.message}`);
    return;
  }

  try {
    const field = await table.getFieldById(fieldId);
    console.log('字段信息:', field);
  } catch (error: any) {
    uiBuilder.text(`❌ 无法获取附件字段 (${fieldId})：${error.message}`);
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
      // 分批上传，获取 file_token 列表
      const fileTokens = await batchUploadFiles(Array.from(files), (batch) =>
        bitable.base.batchUploadFile(batch)
      );

      if (!fileTokens.length) {
        throw new Error("上传图片失败，未获取到任何 file_token");
      }

      // 构造附件字段的值（标准格式）
      const attachmentValue = fileTokens.map((token) => ({ file_token: token }));
      console.log('准备写入的附件值:', attachmentValue);

      // 构造记录字段（确保 fieldId 是字符串键）
      const fields: Record<string, any> = {};
      fields[String(fieldId)] = attachmentValue;

      // 创建记录
      const recordId = await table.addRecord({ fields });
      console.log('创建记录成功，recordId:', recordId);

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 成功！已将 ${files.length} 张图片添加到新记录 (ID: ${recordId}) 中。`);
    } catch (error: any) {
      uiBuilder.hideLoading();
      uiBuilder.text(`❌ 上传或写入失败：${error.message}`);
      console.error('详细错误:', error);
    }
  });
}