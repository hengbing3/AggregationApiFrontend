import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  values: Partial<API.InterfaceInfo>;
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时,将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
};
const DeleteModal: React.FC<Props> = (props) => {
  const { values, visible, onCancel, onSubmit } = props;

  // 创建一个Modal组件,通过visible属性控制其显示或隐藏,footer设置为null把表单项的'取消'和'确认'按钮去掉
  return (
    <Modal
      title="是否确定要删除？"
      visible={visible}
      onOk={async () => {
        console.log('submit!', values);
          onSubmit?.(values);
      }}
      onCancel={() => onCancel?.()}
    ></Modal>
  );
};
export default DeleteModal;
