//@ts-nocheck
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

// 极简国际化适配，彻底避免t函数报错
const t = (text: string) => text;

export default async function main(uiBuilder: UIBuilder) {
  try {
    // 1. 基础提示文本（必显示）
    uiBuilder.markdown(`
> Welcome，这是飞书多维表格图片批量上传插件
请选择目标数据表/图片字段，并上传需要批量导入的图片 👉 [使用指南](https://www.feishu.cn)
    `);

    // 2. 原生HTML多图片上传（兼容所有SDK版本，解决fileUpload报错）
    uiBuilder.addHtml(`
      <div style="margin: 16px 0; padding: 12px; border: 1px dashed #ccc; border-radius: 6px;">
        <p style="margin:0 0 8px 0; font-weight: bold;">📸 批量选择图片（支持多选）</p>
        <input 
          type="file" 
          id="imageUploader" 
          accept="image/*" 
          multiple 
          style="padding: 6px; width: 100%;"
        >
        <p style="margin:8px 0 0 0; font-size:12px; color:#666;">支持：JPG/PNG/GIF/WEBP，单张≤10MB</p>
      </div>
    `);

    // 3. 基础表单（tableSelect/fieldSelect 全版本兼容）
    await uiBuilder.form((form) => ({
      formItems: [
        form.tableSelect('table', {
          label: '选择目标数据表',
          required: true,
        }),
        form.fieldSelect('imageField', {
          label: '选择图片字段',
          sourceTable: 'table',
          required: true,
          filter: (field) => field.type === 'Image',
        }),
      ],
      buttons: ['开始上传', '取消'],
    }), async ({ key, values }) => {
      // 取消逻辑
      if (key === '取消') {
        uiBuilder.markdown(`✅ 已取消上传`);
        return;
      }

      // 开始上传逻辑
      if (key === '开始上传') {
        try {
          const { table, imageField } = values;
          // 校验表格/字段
          if (!table || !imageField) {
            uiBuilder.markdown(`❌ 请选择数据表和图片字段！`);
            return;
          }

          // 获取原生上传的图片文件（核心：兼容所有版本）
          const fileInput = document.getElementById('imageUploader') as HTMLInputElement;
          const files = fileInput?.files;
          if (!files || files.length === 0) {
            uiBuilder.markdown(`❌ 请先选择要上传的图片！`);
            return;
          }

          // 转换为数组
          const images = Array.from(files);
          uiBuilder.markdown(`📤 开始上传 ${images.length} 张图片，请稍候...`);

          // 核心上传逻辑
          const tableInst = await bitable.base.getTableById(table);
          let successCount = 0;
          const failList: string[] = [];

          // 逐张上传
          for (let i = 0; i < images.length; i++) {
            const file = images[i];
            try {
              // 飞书官方图片上传API（全版本兼容）
              const imageValue = await tableInst.createImageFieldValue({ file });
              // 插入新行
              await tableInst.addRecord({
                fields: { [imageField]: imageValue }
              });
              successCount++;
              uiBuilder.markdown(`✅ 第${i+1}张 ${file.name} 上传成功`);
            } catch (err) {
              const msg = (err as Error).message || '未知错误';
              failList.push(`第${i+1}张：${file.name} - ${msg}`);
              uiBuilder.markdown(`❌ 第${i+1}张上传失败：${msg}`);
            }
          }

          // 上传结果汇总
          uiBuilder.markdown(`
### 📊 上传完成
总数量：${images.length}
成功：${successCount}
失败：${failList.length}
${failList.length > 0 ? `失败列表：\n` + failList.join('\n') : ''}
          `);

        } catch (err) {
          uiBuilder.markdown(`❌ 上传失败：${(err as Error).message}`);
        }
      }
    });

  } catch (initErr) {
    uiBuilder.markdown(`❌ 插件初始化异常：${(initErr as Error).message}`);
  }
}