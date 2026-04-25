// src/runUIBuilder.tsx - 飞书多维表格批量图片上传插件
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

// 定义附件字段值的类型
interface AttachmentRecord {
  token: string;
  name?: string;
  size?: number;
  type?: string;
}

// 批量上传文件的辅助函数
async function batchUploadFiles(
  files: File[],
  onProgress?: (uploaded: number, total: number) => void
): Promise<AttachmentRecord[]> {
  const BATCH_SIZE = 20;
  const allAttachments: AttachmentRecord[] = [];
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    try {
      // 使用飞书SDK的批量上传API
      const tokens = await bitable.base.batchUploadFile(batch);
      
      if (!tokens || tokens.length !== batch.length) {
        throw new Error(`第 ${Math.floor(i / BATCH_SIZE) + 1} 批上传失败，返回结果不完整`);
      }
      
      // 创建附件记录，包含文件信息
      const batchAttachments = tokens.map((token, index) => {
        const file = batch[index];
        return {
          token,
          name: file.name,
          size: file.size,
          type: file.type
        };
      });
      
      allAttachments.push(...batchAttachments);
      
      // 更新进度
      if (onProgress) {
        onProgress(allAttachments.length, files.length);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      throw new Error(`上传第 ${Math.floor(i / BATCH_SIZE) + 1} 批失败: ${errorMessage}`);
    }
  }
  
  return allAttachments;
}

// 创建图片预览元素

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 显示上传结果
function showUploadResult(uiBuilder: UIBuilder, successCount: number, totalCount: number, recordId?: string) {
  const successRate = ((successCount / totalCount) * 100).toFixed(1);
  
  uiBuilder.text(`\n✅ 上传完成！`);
  uiBuilder.text(`成功率: ${successRate}%`);
  uiBuilder.text(`上传总数: ${totalCount} 张`);
  uiBuilder.text(`成功数量: ${successCount} 张`);
  if (recordId) {
    uiBuilder.text(`记录ID: ${recordId}`);
  }
}

export default async function main(uiBuilder: UIBuilder) {
  // 1. 显示插件标题和说明
  uiBuilder.text("📸 飞书多维表格批量图片上传插件");
  uiBuilder.text("本插件支持批量上传图片到飞书多维表格的附件字段，支持多选、分批上传和图片预览。");

  // 2. 选择表格和附件字段
  const { tableId, fieldId } = await new Promise<{ tableId: string; fieldId: string }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.tableSelect("table", { 
            label: "目标表格",
            required: true 
          }),
          form.fieldSelect("field", {
            label: "附件字段",
            sourceTable: "table",
            filterByTypes: [17], // 17 = Attachment
            required: true,
            helpText: "请选择类型为'附件'的字段"
          }),
        ],
        buttons: ["确认选择"],
        title: "第一步：选择目标位置"
      }),
      (args) => {
        resolve({ 
          tableId: args.values.table as string, 
          fieldId: args.values.field as string 
        });
      }
    );
  });

  if (!tableId || !fieldId) {
    uiBuilder.text("❌ 未选择表格或附件字段，操作已取消");
    return;
  }

  // 获取表格对象
  const table = await bitable.base.getTableById(tableId);
  
  uiBuilder.text(`✅ 已选择表格和附件字段`);
  
  // 3. 上传配置选项
  uiBuilder.text("\n第二步：配置上传选项");
  
  const { createMode } = await new Promise<{ createMode: string }>((resolve) => {
    uiBuilder.form(
      (form) => ({
        formItems: [
          form.select("createMode", {
            label: "创建模式",
            options: [
              { value: "single", label: "单条记录（所有图片在一个记录中）" },
              { value: "multiple", label: "多条记录（每张图片一个记录）" }
            ],
            defaultValue: "single",
            helpText: "选择如何创建记录：将所有图片放在一个记录中，或为每张图片创建单独记录"
          })
        ],
        buttons: ["继续"],
        title: "上传配置"
      }),
      (args) => {
        resolve({ 
          createMode: args.values.createMode as string
        });
      }
    );
  });
  
  // 4. 图片选择和上传
  uiBuilder.buttons("", ["📁 选择图片并上传"], async () => {
    // 创建文件选择器
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept = "image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    const files = await new Promise<File[]>((resolve) => {
      fileInput.onchange = () => {
        if (fileInput.files) {
          const fileArray = Array.from(fileInput.files);
          resolve(fileArray);
        } else {
          resolve([]);
        }
        document.body.removeChild(fileInput);
      };
      fileInput.click();
    });

    if (!files.length) {
      uiBuilder.text("⚠️ 未选择任何图片文件");
      return;
    }

    // 显示选择的图片信息
    uiBuilder.text(`已选择 ${files.length} 张图片：`);
    
    // 显示文件列表（简化版，不显示图片预览）
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const sizeStr = formatFileSize(file.size);
        uiBuilder.text(`${index + 1}. ${file.name} (${sizeStr}, ${file.type})`);
      }
    });
    
    // 显示上传状态（使用文本代替进度条）
    uiBuilder.text("准备上传...");
    
    try {
      // 开始上传
      uiBuilder.text('开始上传图片...');
      
      const attachments = await batchUploadFiles(files, (uploaded, total) => {
        const percent = Math.round((uploaded / total) * 100);
        uiBuilder.text(`上传中: ${uploaded}/${total} (${percent}%)`);
      });
      
      if (attachments.length === 0) {
        throw new Error("上传失败，未获取到任何文件token");
      }
      
      // 根据创建模式处理记录
      let recordId: string | undefined;
      
      if (createMode === "single") {
        // 单条记录模式：所有图片在一个记录中
        // 附件字段应该只需要文件token数组
        const attachmentTokens = attachments.map(att => att.token);
        
        const newRecord = await table.addRecord({
          fields: {
            [fieldId]: attachmentTokens
          }
        });
        
        recordId = newRecord;
        uiBuilder.text(`✅ 已创建记录 ${recordId}，包含 ${attachments.length} 张图片`);
        
      } else {
        // 多条记录模式：每张图片一个记录
        const recordIds: string[] = [];
        
        for (const att of attachments) {
          const newRecord = await table.addRecord({
            fields: {
              [fieldId]: [att.token]  // 只传递token数组
            }
          });
          recordIds.push(newRecord);
        }
        
        recordId = recordIds.join(', ');
        uiBuilder.text(`✅ 已创建 ${recordIds.length} 条记录`);
      }
      
      // 显示成功结果
      showUploadResult(uiBuilder, attachments.length, files.length, recordId);
      
    } catch (error: any) {
      // 显示错误信息
      uiBuilder.text('❌ 上传失败');
      const errorMessage = error instanceof Error ? error.message : String(error);
      uiBuilder.text(`错误: ${errorMessage}`);
      uiBuilder.text("请检查网络连接或文件格式后重试");
      
      console.error("上传详细错误:", error);
      
      // 提供重试按钮
      uiBuilder.buttons("重试上传", ["🔄 重新上传"], () => {
        uiBuilder.reload();
      });
    }
  });
  
  // 5. 添加帮助信息
  uiBuilder.text("\n💡 使用提示：");
  uiBuilder.text("• 支持批量选择最多 100 张图片");
  uiBuilder.text("• 支持 JPG、PNG、GIF、WebP、BMP 格式");
  uiBuilder.text("• 图片会自动分批上传，每批最多 20 张");
  uiBuilder.text("• 上传完成后，图片会保存在飞书云存储中");
  uiBuilder.text("• 可在多维表格中直接预览和管理图片");
}