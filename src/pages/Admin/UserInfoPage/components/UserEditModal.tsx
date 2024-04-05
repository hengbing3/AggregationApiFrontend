import { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';
import React, { useEffect, useRef } from 'react';

export type Props = {
  initialValues: Partial<API.UserInfoVO>;
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时,将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.UserInfoVO) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
  isLoading: boolean;
  isAddNew?: boolean;
};

const UserEditModal: React.FC<Props> = (props) => {
  const { initialValues, visible,isAddNew,isLoading, onCancel, onSubmit } = props;
  // 假设这是上传头像的API地址
  const uploadAvatarApi = 'http://localhost:8101/api/files/upload';
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
      title={isAddNew ? "新增用户" : "编辑用户信息"}
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
        name="userName"
        label="用户昵称"
        rules={[{ required: true, message: '请输入用户昵称!' }]}
      />
      <ProFormText
        name="userAccount"
        label="账号"
        rules={!isAddNew ? [] : [{ required: true, message: '请输入账号!' }]}
        hidden={!isAddNew}
      />
      <ProFormText
        name="userPassword"
        label="密码"
        rules={!isAddNew ? [] : [{ required: true, message: '请输入密码!' }]}
        hidden={!isAddNew}
        fieldProps={{
          type: 'password',
        }}
      />
      <ProFormText
        name="checkPassword"
        label="确认密码"
        rules={!isAddNew ? [] : [{ required: true, message: '请输入确认密码' }]}
        hidden={!isAddNew}
        fieldProps={{
          type: 'password',
        }}
      />
      <ProFormUploadButton
        name="userAvatar"
        label="用户头像"
        max={1}
        action={uploadAvatarApi}
        extra="支持扩展名：.jpg .jpeg .png"
        rules={[{ required: true, message: '请上传用户头像!' }]}
      />
      <ProFormText name="userProfile" label="用户简介" />
      <ProFormSelect
        options={[
          { value: 'user', label: '普通用户' },
          { value: 'admin', label: '管理员' },
        ]}
        name="userRole"
        label="用户角色"
        rules={[{ required: true, message: '请选择用户角色!' }]}
      />
      <ProFormSelect
        options={[
          { value: 1, label: 'API开放平台' },
          { value: 2, label: 'API审核部门' },
          { value: 3, label: '普通用户组' },
        ]}
        name="departmentId"
        label="用户部门"
        rules={[{ required: true, message: '请选择用户部门!' }]}
      />
    </ModalForm>
  );
};

export default UserEditModal;
