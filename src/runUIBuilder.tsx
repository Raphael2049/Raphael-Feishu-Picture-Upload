// src/runUIBuilder.tsx
import { bitable, UIBuilder } from "@lark-base-open/js-sdk";

export default async function main(uiBuilder: UIBuilder, { t }: any) {
  uiBuilder.form(
    (form) => ({
      formItems: [
        form.tableSelect('tableId', { label: '选择表格' }),
        form.fieldSelect('fieldId', {
          label: '选择附件字段',
          sourceTable: 'tableId',
          // @ts-ignore
          filterByTypes: [17],
        }),
      ],
      buttons: ['选择图片并上传'],
    }),
    async ({ values }) => {
      const { tableId, fieldId } = values as any;

      if (!tableId || !fieldId) {
        uiBuilder.text('请完整填写表单项');
        return;
      }

      const table = await bitable.base.getTableById(tableId);
      const fieldMeta = await table.getFieldMetaById(fieldId);

      if (fieldMeta.type !== 17) {
        uiBuilder.text('❌ 选择的字段不是附件类型，请返回重新选择');
        return;
      }

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true;
      fileInput.accept = 'image/*';
      document.body.appendChild(fileInput);

      const files = await new Promise<FileList>((resolve) => {
        fileInput.onchange = () => {
          if (fileInput.files) resolve(fileInput.files);
          document.body.removeChild(fileInput);
        };
        fileInput.click();
      });

      if (!files.length) {
        uiBuilder.text('未选择任何图片');
        return;
      }

      uiBuilder.showLoading(`正在上传 ${files.length} 张图片...`);

      const tokens = await bitable.base.batchUploadFile(Array.from(files));

      const attachments = tokens.map((token, idx) => ({
        file_token: token,
        name: files[idx].name,
        size: files[idx].size,
        type: files[idx].type,
      }));

      // 类型断言：绕过 TypeScript 对附件数组的严格检查
      const recordId = await table.addRecord({
        fields: {
          [fieldId as string]: attachments as any,
        },
      } as any);

      uiBuilder.hideLoading();
      uiBuilder.text(`✅ 已创建记录 ${recordId}，包含 ${attachments.length} 张图片，请刷新表格查看。`);
    }
  );
}