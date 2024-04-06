/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-04-06 17:15:54
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-04-06 17:17:21
 * @FilePath: \my-api-frontend\src\pages\MyInfo\components\UserEditModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';
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
};

const UserEditModal: React.FC<Props> = (props) => {
  const { initialValues, visible,isLoading, onCancel, onSubmit } = props;
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
    });
    onCancel();
  };

  return (
    <ModalForm
      loading={isLoading}
      title={"编辑用户信息"}
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
      <ProFormUploadButton
        name="userAvatar"
        label="用户头像"
        max={1}
        action={uploadAvatarApi}
        extra="支持扩展名：.jpg .jpeg .png"
        rules={[{ required: true, message: '请上传用户头像!' }]}
      />
      <ProFormText name="userProfile" label="用户简介" />
    </ModalForm>
  );
};

export default UserEditModal;
