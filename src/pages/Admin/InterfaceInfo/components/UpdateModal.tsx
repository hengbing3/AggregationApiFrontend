import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  values: Partial<API.InterfaceInfo>;
  columns: ProColumns<API.InterfaceInfo>[];
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时,将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.InterfaceInfoParam) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const { columns, values, visible, onCancel, onSubmit } = props;
  // 使用React的useRef创建一个引用，以访问ProTable中的表单实例
  const formRef = useRef<ProFormInstance>();
   // 防止修改的表单内容一直是同一个内容,要监听values的变化
  // 使用React的useEffect在值改变时更新表单的值
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);

  // 创建一个Modal组件,通过visible属性控制其显示或隐藏,footer设置为null把表单项的'取消'和'确认'按钮去掉
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        formRef={formRef}
        columns={columns}
        onSubmit={async (valuse: API.InterfaceInfoParam) => {
          onSubmit?.(valuse);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
