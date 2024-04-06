import { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import React, { useEffect, useRef } from 'react';

export type Props = {
  initialValues: Partial<API.ChangePasswordParam>;
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时,将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.ChangePasswordParam) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
  isLoading: boolean;
};

const ChangePasswordModal: React.FC<Props> = (props) => {
  const { initialValues, visible, isLoading, onCancel, onSubmit } = props;

  // 创建表单引用
  const formRef = useRef<ProFormInstance>();

  // 提交表单
  const handleSubmit = async (values: any) => {
    console.log('Received values of form: ', values);
    // 这里应该是你调用后端接口更新用户信息的代码
    onSubmit?.(values);
  };
  // 使用React的useEffect在值改变时更新表单的值
  useEffect(() => {
    if (visible) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [initialValues, visible]);

  // 修改onCancel回调以包含重置表单
  const handleCancel = () => {
    formRef.current?.setFieldsValue({
      userName: '',
      userAvatar: [
      ],
      userProfile: '',
      userRole: '',
      departmentId: undefined,
    });
    onCancel();
  };

  return (
    <ModalForm
      loading={isLoading}
      title={"修改密码"}
      formRef={formRef}
      open={visible}
      initialValues={initialValues}
      onFinish={handleSubmit}
      onOpenChange={(visible) => {
        if (!visible) {
          handleCancel();
        }
      }}
    >
      <ProFormText
        name="userPassword"
        label="密码"
        rules={ [{ required: true, message: '请输入密码!' }]}
        fieldProps={{
          type: 'password',
        }}
      />
      <ProFormText
        name="confirmPassword"
        label="确认密码"
        rules={[{ required: true, message: '请输入确认密码' }]}
        fieldProps={{
          type: 'password',
        }}
      />
    </ModalForm>
  );
};

export default ChangePasswordModal;
