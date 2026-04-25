//@ts-nocheck
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

// 移除国际化依赖（无配置时会导致渲染异常），简化文本
const t = (text: string) => text;

export default async function main(uiBuilder: UIBuilder) {
  try {
    // 1. 渲染欢迎文本（确保基础UI正常）
    uiBuilder.markdown(`
> ${t('Welcome')}，这是飞书多维表格图片批量上传插件  
请选择目标数据表/图片字段，并上传需要批量导入的图片 👉 [使用指南](https://www.feishu.cn)
    `);

    // 2. 强制渲染核心表单（解决表单不显示问题）
    await uiBuilder.form(
      (form) => ({
        formItems: [
          // 选择目标数据表
          form.tableSelect('table', {
            label: '选择目标数据表',
            required: true,
            placeholder: '请选择要上传图片的表格',
          }),
          // 筛选仅图片类型字段
          form.fieldSelect('imageField', {
            label: '选择图片字段',
            sourceTable: 'table', // 关联已选数据表
            required: true,
            placeholder: '请选择表格中的「图片」类型字段',
            filter: (field) => field.type === 'Image', // 仅显示图片字段
          }),
          // 批量图片上传组件（核心）
          form.fileUpload('images', {
            label: '选择批量上传的图片',
            required: true,
            accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], // 仅图片
            multiple: true, // 批量上传
            maxCount: 50, // 单次最多50张
            maxSize: 10 * 1024 * 1024, // 单张10MB（飞书限制）
            placeholder: '点击上传或拖拽图片到此处',
          }),
        ],
        buttons: ['开始上传', '取消'], // 操作按钮
      }),
      async ({ key, values }) => {
        // 取消按钮逻辑
        if (key === '取消') {
          uiBuilder.markdown(`✅ 已取消图片上传操作`);
          return;
        }

        // 开始上传逻辑
        if (key === '开始上传') {
          const { table, imageField, images } = values;
          // 基础校验
          if (!table || !imageField || !images?.length) {
            uiBuilder.markdown(`❌ 请完善必填项：选择数据表、图片字段并上传图片`);
            return;
          }

          uiBuilder.markdown(`📤 开始上传${images.length}张图片，请稍候...`);

          // 核心上传逻辑
          try {
            const tableInst = await bitable.base.getTableById(table);
            let success = 0, fail = 0;
            const failMsg: string[] = [];

            // 逐张上传图片并插入行
            for (let i = 0; i < images.length; i++) {
              const file = images[i];
              try {
                // 上传图片到飞书服务器，生成图片字段值
                const imgValue = await tableInst.createImageFieldValue({ file });
                // 插入新行，写入图片字段
                await tableInst.addRecord({
                  fields: { [imageField]: imgValue },
                });
                success++;
                uiBuilder.markdown(`✅ 第${i + 1}张：${file.name} 上传成功`);
              } catch (err) {
                fail++;
                const msg = (err as Error).message || '未知错误';
                failMsg.push(`第${i + 1}张：${file.name}（${msg}）`);
                uiBuilder.markdown(`❌ 第${i + 1}张：${file.name} 上传失败 - ${msg}`);
              }
            }

            // 上传完成汇总
            uiBuilder.markdown(`
### 📊 上传完成
- 总计：${images.length}张
- 成功：${success}张
- 失败：${fail}张
${failMsg.length > 0 ? `\n失败详情：\n${failMsg.join('\n')}` : ''}
            `);
          } catch (err) {
            uiBuilder.markdown(`❌ 上传流程异常：${(err as Error).message}`);
          }
        }
      }
    );
  } catch (initErr) {
    // 捕获初始化/表单渲染异常（关键：避免白屏）
    uiBuilder.markdown(`❌ 插件初始化失败：${(initErr as Error).message}`);
  }
}