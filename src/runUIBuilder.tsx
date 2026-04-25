//@ts-nocheck
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

export default async function main(uiBuilder: UIBuilder, { t }) {
    uiBuilder.markdown(`
  > ${t('Welcome')}，这是飞书多维表格批量上传图片插件  
  请选择数据表和附件字段（用于存储图片），然后批量上传图片，图片将自动写入选中的数据表中 👉 [使用指南](https://feishu.feishu.cn/docx/OHxZdBQrVo5uudx1moIcL5jcn3c)
  `);

    // 构建核心表单
    uiBuilder.form((form) => ({
        formItems: [
            // 1. 选择数据表
            form.tableSelect('table', { 
                label: '选择数据表', 
                required: true 
            }),
            // 2. 选择附件字段（核心修正：筛选Attachment类型字段）
            form.fieldSelect('attachmentField', { 
                label: '选择附件字段（存储图片）', 
                sourceTable: 'table',
                required: true,
                filter: (field) => field.type === 'Attachment' // 仅显示附件类型字段
            }),
            // 3. 批量图片上传组件
            form.fileUpload('uploadFiles', { 
                label: '批量上传图片', 
                accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], // 常见图片格式
                multiple: true, // 支持批量
                required: true 
            }),
        ],
        buttons: ['确认上传', '取消'],
    }), async ({ key, values }) => {
        // 点击取消按钮
        if (key === '取消') {
            uiBuilder.markdown(`✅ 已取消上传操作`);
            return;
        }

        // 点击确认上传按钮：执行核心逻辑
        if (key === '确认上传') {
            try {
                const { table: tableId, attachmentField: fieldId, uploadFiles } = values;
                // 校验必填项
                if (!tableId || !fieldId || !uploadFiles?.length) {
                    uiBuilder.markdown(`❌ 请完整填写：选择数据表、附件字段并上传图片`);
                    return;
                }

                uiBuilder.markdown(`🔄 开始上传${uploadFiles.length}张图片，请稍候...`);

                // 1. 获取数据表实例
                const table = await bitable.base.getTableById(tableId);
                // 2. 批量处理图片并写入数据表（适配附件字段格式）
                let successCount = 0;
                for (const file of uploadFiles) {
                    try {
                        // 上传文件到飞书存储，获取fileToken
                        const fileToken = await file.upload();
                        // 写入数据行：附件字段格式为 [{ token: 'xxx', name: '文件名' }]
                        await table.addRecord({
                            fields: {
                                [fieldId]: [{ 
                                    token: fileToken, 
                                    name: file.name // 保留原文件名
                                }]
                            }
                        });
                        successCount++;
                    } catch (fileError) {
                        uiBuilder.markdown(`❌ 单张图片上传失败：${file.name}，原因：${fileError.message}`);
                    }
                }

                // 上传完成反馈
                uiBuilder.markdown(`✅ 批量上传完成！成功${successCount}张，失败${uploadFiles.length - successCount}张`);

            } catch (error) {
                // 全局异常捕获
                uiBuilder.markdown(`❌ 批量上传失败：${error.message}`);
            }
        }
    });
}