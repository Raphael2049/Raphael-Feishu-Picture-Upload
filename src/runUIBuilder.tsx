//@ts-nocheck
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

export default async function main(uiBuilder: UIBuilder, { t }) {
    uiBuilder.markdown(`
  > ${t('Welcome')}，这是飞书多维表格图片批量上传插件  
  请选择目标数据表/图片字段，并上传需要批量导入的图片 👉 [使用指南](https://feishu.feishu.cn/docx/OHxZdBQrVo5uudx1moIcL5jcn3c)
  `);

    // 构建核心表单：选择数据表+图片字段 + 批量上传图片
    uiBuilder.form((form) => ({
        formItems: [
            // 1. 选择目标数据表
            form.tableSelect('table', { 
                label: '选择目标数据表', 
                required: true 
            }),
            // 2. 选择图片类型的字段（需确保字段类型为「图片」）
            form.fieldSelect('imageField', { 
                label: '选择图片字段', 
                sourceTable: 'table',
                required: true,
                // 过滤仅显示图片类型的字段（关键：避免选到非图片字段）
                filter: (field) => field.type === 'Image' 
            }),
            // 3. 批量图片上传组件（核心）
            form.fileUpload('images', {
                label: '选择批量上传的图片',
                required: true,
                accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], // 限制仅图片类型
                multiple: true, // 开启批量上传
                maxCount: 50, // 限制单次上传数量（可调整）
                maxSize: 10 * 1024 * 1024, // 单文件最大10MB（飞书多维表格图片字段限制）
            }),
        ],
        buttons: ['开始上传', '取消'],
    }), async ({ key, values }) => {
        // 点击「取消」按钮：仅提示
        if (key === '取消') {
            uiBuilder.markdown(`✅ 已取消图片上传操作`);
            return;
        }

        // 点击「开始上传」按钮：执行核心上传逻辑
        if (key === '开始上传') {
            try {
                const { table, imageField, images } = values;
                // 校验必要参数
                if (!table || !imageField || !images?.length) {
                    uiBuilder.markdown(`❌ 请完善必填项：选择数据表、图片字段并上传图片`);
                    return;
                }

                uiBuilder.markdown(`📤 开始批量上传图片（共${images.length}张），请稍候...`);

                // 1. 获取数据表实例
                const tableInst = await bitable.base.getTableById(table);
                // 2. 批量上传图片到多维表格（逐张上传，带进度反馈）
                let successCount = 0;
                let failList: string[] = [];

                for (const [index, file] of images.entries()) {
                    try {
                        // 飞书SDK：上传文件到图片字段（核心API）
                        const imageValue = await tableInst.createImageFieldValue({
                            file: file,
                        });
                        // 插入新行：将图片写入选中的图片字段
                        await tableInst.addRecord({
                            fields: {
                                [imageField]: imageValue, // 图片字段赋值
                            },
                        });
                        successCount++;
                        uiBuilder.markdown(`✅ 第${index+1}张图片上传成功：${file.name}`);
                    } catch (err) {
                        const errMsg = (err as Error).message || '未知错误';
                        failList.push(`第${index+1}张：${file.name}（${errMsg}）`);
                        uiBuilder.markdown(`❌ 第${index+1}张图片上传失败：${file.name} - ${errMsg}`);
                    }
                }

                // 3. 上传完成汇总反馈
                uiBuilder.markdown(`
  ### 📊 批量上传完成
  - 总上传数：${images.length}
  - 成功数：${successCount}
  - 失败数：${failList.length}
  ${failList.length > 0 ? `\n失败详情：\n${failList.join('\n')}` : ''}
  `);

            } catch (globalErr) {
                // 全局异常捕获
                const errMsg = (globalErr as Error).message || '上传流程异常';
                uiBuilder.markdown(`❌ 批量上传失败：${errMsg}`);
            }
        }
    });
}