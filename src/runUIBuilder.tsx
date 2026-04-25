//@ts-nocheck
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

export default async function main(uiBuilder: UIBuilder) {
  try {
    // ============== 1. 基础提示文本（所有版本必支持） ==============
    uiBuilder.markdown(`
# Welcome
这是飞书多维表格图片批量上传插件
请填写 数据表ID、图片字段ID，再选择图片上传
    `);

    // ============== 2. 原生HTML输入框（无任何SDK依赖，永不报错） ==============
    uiBuilder.addHtml(`
<div style="padding: 10px 0;">
  <div style="margin:10px 0;">
    <label>数据表 ID：</label>
    <input type="text" id="tableId" placeholder="请输入数据表ID" style="width:100%;padding:8px;">
  </div>
  <div style="margin:10px 0;">
    <label>图片字段 ID：</label>
    <input type="text" id="fieldId" placeholder="请输入图片字段ID" style="width:100%;padding:8px;">
  </div>
  <div style="margin:10px 0;padding:10px;border:1px dashed #ccc;">
    <label>批量上传图片：</label>
    <input type="file" id="files" accept="image/*" multiple style="margin-top:5px;">
  </div>
</div>
    `);

    // ============== 3. 基础按钮（唯一支持的按钮组件） ==============
    uiBuilder.createButton('开始上传', async () => {
      try {
        // 获取输入的ID
        const tableId = (document.getElementById('tableId') as HTMLInputElement).value.trim();
        const fieldId = (document.getElementById('fieldId') as HTMLInputElement).value.trim();
        const fileInput = document.getElementById('files') as HTMLInputElement;
        const files = fileInput.files ? Array.from(fileInput.files) : [];

        // 校验
        if (!tableId || !fieldId) {
          uiBuilder.markdown(`❌ 请填写 数据表ID 和 字段ID`);
          return;
        }
        if (files.length === 0) {
          uiBuilder.markdown(`❌ 请选择图片`);
          return;
        }

        uiBuilder.markdown(`📤 开始上传 ${files.length} 张图片...`);

        // 核心上传逻辑
        const table = await bitable.base.getTableById(tableId);
        let success = 0;
        for (const file of files) {
          try {
            const img = await table.createImageFieldValue({ file });
            await table.addRecord({ fields: { [fieldId]: img } });
            success++;
          } catch (e) {}
        }

        uiBuilder.markdown(`✅ 上传完成！成功：${success}/${files.length}`);
      } catch (e) {
        uiBuilder.markdown(`❌ 上传失败：${(e as Error).message}`);
      }
    });

    // 取消按钮
    uiBuilder.createButton('取消', () => {
      uiBuilder.markdown(`✅ 已取消操作`);
    });

  } catch (e) {
    uiBuilder.markdown(`❌ 初始化失败：${(e as Error).message}`);
  }
}