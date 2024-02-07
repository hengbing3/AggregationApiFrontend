/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-31 23:13:51
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-02-01 21:41:08
 * @FilePath: \my-api-frontend\src\pages\InterfaceInfo\components\CreateModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时,将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.InterfaceInfoParam) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
  // values不用传递
  // values: Partial<API.RuleListItem>;
};
const CreateModal: React.FC<Props> = (props) => {
  const { columns, visible, onCancel, onSubmit } = props;
  // 创建一个Modal组件,通过visible属性控制其显示或隐藏,footer设置为null把表单项的'取消'和'确认'按钮去掉
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (valuse: API.InterfaceInfoParam) => {
          onSubmit?.(valuse);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
