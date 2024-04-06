import {
  changePassWordUsingPut,
  getUserAccessKeyUsingGet,
  queryUserInfoByIdUsingGet,
  updateMyUserInfoUsingPut,
  updateUserAccessKeyUsingPut,
} from '@/services/my-api-backend/userController';
import {
  ActionType,
  PageContainer,
  ProCard,
  ProDescriptions,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Modal, Tag, message } from 'antd';
import { Divider } from 'antd/lib';
import { values } from 'lodash';
import { useRef, useState } from 'react';
import ChangePasswordModal from './components/ChangePasswordModal';
import UserEditModal from './components/UserEditModal';
const UserInfo: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<API.UserInfoVO>();
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [changePasswordModalOpen, handleChangePasswordModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  const formatInitialValues = (record: any) => {
    if (record && typeof record.userAvatar === 'string') {
      return {
        ...record,
        userAvatar: [
          {
            uid: '', // 注意：这里的UID只需要是唯一的，'-1'只是一个示例
            name: 'avatar.png', // 可以是任意文件名
            status: 'done',
            url: record.userAvatar,
          },
        ],
      };
    }
    return record;
  };
  const handleUpdateUser = async (record: any) => {
    try {
      setIsLoading(true);
      console.log('record', record);
      const res: any = await queryUserInfoByIdUsingGet({ id: record.id });
      if (res.code === 200) {
        setCurrentRow(formatInitialValues(res.data));
        handleUpdateModalOpen(true);
      }
    } catch (error: any) {
      message.error('查询失败' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCertificate = () => {
    Modal.confirm({
      title: '你确定要重置访问凭证吗？',
      content: '此操作将重置访问凭证，请谨慎操作。',
      onOk: async () => {
        try {
          // 这里替换为实际调用接口的代码
          const res: any = await updateUserAccessKeyUsingPut({
            ...values,
          });
          if (res.code === 200) {
            message.success('重置访问凭证成功');
            setReloadFlag(!reloadFlag);
          }
        } catch (error: any) {
          message.error('重置访问凭证失败' + error.message);
        }
      },
      onCancel: () => {
        console.log('取消重置访问凭证');
      },
    });
  };

  const handleUpdateMyUserInfo = async (values: any) => {
    try {
      setIsLoading(true);
      const avatarUrl = values.userAvatar[0].url ? null : values.userAvatar[0].response.data[0];
      console.log('解析后的头像', avatarUrl);
      const res: any = await updateMyUserInfoUsingPut({
        ...values,
        id: currentRow?.id,
        userAvatar: avatarUrl,
      });
      if (res.code === 200) {
        message.success('编辑成功');
        handleUpdateModalOpen(false);
        actionRef.current?.reload();
      }
    } catch (error: any) {
      message.error('编辑失败' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (values: API.ChangePasswordParam) => {
    try {
      console.log("change", values)
      console.log(values.userPassword);
      console.log(values.confirmPassword);

      if (values.userPassword !== values.confirmPassword) {
          message.error('两次输入的密码不一致');
          return;
      } else {
        setIsLoading(true);
        const res: any = await changePassWordUsingPut({
          ...values,
          id: loginUser?.id as any,
          isRestPassword: false,
        })
        if (res.code === 200) {
          message.success('修改密码成功');
          handleChangePasswordModalOpen(false);
          actionRef.current?.reload();
        }
      }
    } catch (error: any) {
      message.error('修改密码失败' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const columns: ProDescriptionsItemProps<API.UserInfoVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
      hideInDescriptions: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '用户简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: false,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        admin: {
          text: '管理员',
        },
        user: {
          text: '普通用户',
        },
      },
      render: (_, record) => (
        <Tag color={record.userRole === 'admin' ? 'red' : 'blue'}>
          {record.userRole === 'admin' ? '管理员' : '普通用户'}
        </Tag>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProCard
        title="个人信息"
        // 设置卡片内部元素之间的间距。这里表示水平间距为0，垂直间距为16像素。
        gutter={[0, 16]}
        // 为卡片添加边框
        bordered
        // 为卡片的头部（即标题栏）添加底部边框
        headerBordered
        // 设置卡片内容的布局方向为竖直方向。ProCard组件内的子元素将会竖直排列。
        direction="column"
        // 设置卡片的CSS样式。这里使用了CSS的marginBlockStart属性，为卡片顶部添加8像素的外边距。
        style={{ marginBlockStart: 8 }}
        extra={
          <>
            <Button
              type="primary"
              onClick={() => {
                handleUpdateUser(loginUser);
              }}
            >
              编辑信息
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              onClick={() => {
                handleChangePasswordModalOpen(true);
              }}
            >
              修改密码
            </Button>
          </>
        }
      >
        <ProDescriptions
          column={1}
          actionRef={actionRef}
          request={async () => {
            const res = await queryUserInfoByIdUsingGet({
              id: loginUser?.id as any,
            });
            if (res?.data) {
              return {
                data: res?.data || '',
                success: true,
              };
            } else {
              return {
                data: '',
                success: false,
              };
            }
          }}
          emptyText={'空'}
          columns={columns}
        ></ProDescriptions>
        <ProCard
          title="用户凭证"
          type="inner"
          bordered
          // 使用reloadFlag作为key来触发组件重新加载
          key={reloadFlag.toString()}
          extra={
            <Button
              onClick={() => {
                handleUpdateCertificate();
              }}
            >
              更新凭证
            </Button>
          }
        >
          <ProDescriptions
            column={1}
            request={async () => {
              const res = await getUserAccessKeyUsingGet({
                ...values,
              });
              if (res?.data) {
                return {
                  data: res?.data || '',
                  success: true,
                  total: res.data,
                };
              } else {
                return {
                  data: '',
                  success: false,
                  total: 0,
                };
              }
            }}
            emptyText={'空'}
            columns={[
              {
                title: 'AccessKey',
                dataIndex: 'accessKey',
                copyable: true,
              },
              {
                title: 'SecretKey',
                dataIndex: 'secretKey',
                copyable: true,
              },
            ]}
          ></ProDescriptions>
        </ProCard>
        <ProCard title="开发者 SDK（快速调用接口）" type="inner" bordered>
          <Button
            type="primary"
            href={'https://github.com/hengbing3/myapi-backend'}
            target="_blank"
          >
            获取 Java SDK
          </Button>
        </ProCard>
      </ProCard>
      <UserEditModal
        isLoading={isLoading}
        initialValues={currentRow || {}}
        visible={updateModalOpen}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!updateModalOpen) {
            console.log('清除数据');
            setCurrentRow(undefined);
          }
        }}
        onSubmit={async (values: any) => {
          handleUpdateMyUserInfo(values);
          setCurrentRow(undefined);
        }}
      />
      <ChangePasswordModal
        initialValues={{}}
        visible={changePasswordModalOpen}
        onCancel={() => {
          handleChangePasswordModalOpen(false);
          if (!updateModalOpen) {
            console.log('清除数据');
          }
        }}
        onSubmit={async (values: any) => {
          handleChangePassword(values)
          handleChangePasswordModalOpen(values);
        }}
        isLoading={isLoading}
      />
    </PageContainer>
  );
};

export default UserInfo;
