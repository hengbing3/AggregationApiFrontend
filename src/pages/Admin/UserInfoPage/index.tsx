import { addUserUsingPost, editUserInfoUsingPut, queryUserByConditionUsingPost, queryUserInfoByIdUsingGet } from '@/services/my-api-backend/userController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, message } from 'antd';
import { useRef, useState } from 'react';
import ShowDetailModal from './components/ShowDetailModal';
import UserEditModal from './components/UserEditModal';



export default () => {

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAdd, setIsAddNew] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UserInfoVO>();
  const actionRef = useRef<ActionType>();

  const handleShowUserInfo = async (record: any) => {
    try {
      const res: any = await queryUserInfoByIdUsingGet({ id: record.id });
      if (res.code === 200) {
        setCurrentRow(res.data);
        setShowDetail(true);
      }
    } catch (error: any) {
      message.error('查询失败' + error.message);
    }
  }
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
      const res: any = await queryUserInfoByIdUsingGet({ id: record.id });
      if (res.code === 200) {
        setCurrentRow(formatInitialValues(res.data));
        handleUpdateModalOpen(true);
        setIsAddNew(false)
      }
    } catch (error: any) {
      message.error('查询失败' + error.message);
    }
  }
  const hadleAddUserInfo = async (values: any) => {
    try {
       const avatarUrl = values.userAvatar[0].response.data[0];
       console.log("照片", avatarUrl);
      const res: any = await addUserUsingPost({
        ...values,
        userAvatar: avatarUrl,
      });
      if (res.code === 200) {
        message.success('新增成功');
        handleUpdateModalOpen(false);
        actionRef.current?.reload();
      }
    } catch (error: any) {
      message.error('新增失败' + error.message);
    }
  }

  const handleUpdateUserInfo = async (values: any) => {
    try {
      const avatarUrl = values.userAvatar[0].url ? null : values.userAvatar[0].response.data[0];
      console.log('解析后的头像', avatarUrl)
      const res: any = await editUserInfoUsingPut({
        ...values,
        id: currentRow?.id,
        userAvatar: avatarUrl,
      });
      if(res.code === 200) {
        message.success('编辑成功');
        handleUpdateModalOpen(false);
        actionRef.current?.reload();
      }
    } catch (error: any) {
      message.error('编辑失败' + error.message);
    }
  }

  const columns: ProColumns<API.UserInfoVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'indexBorder',
      valueType: 'indexBorder',
    },
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      readonly: showDetail ? true : false,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      readonly: showDetail ? true : false,
    },
    {
      title: '用户简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: false,
      readonly: showDetail ? true : false,
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      hideInSearch: true,
      readonly: showDetail ? true : false,
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      valueType: 'select',
      readonly: showDetail ? true : false,
      valueEnum: {
        admin: {
          text: '管理员',
        },
        user: {
          text: '普通用户',
        }
      },
      render: (_, record) => (
        <Tag color={record.userRole === 'admin' ? 'red' : 'blue'}>{record.userRole === 'admin' ? '管理员' : '普通用户'}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'option',
      width: 180,
      valueType: 'option',
      render: (_, row) => [
        <a
          key="a"
          onClick={() => {
            handleShowUserInfo(row);
          }}
        >
          查看
        </a>,
        <a
          key="b"
          onClick={() => {
            handleUpdateUser(row);
          }}
        >
          编辑
        </a>,
        <a
        key="c"
        onClick={() => {
          editUser(row.id);
        }}
      >
        重置密码
      </a>,
      ],
    },
  ];




  return (
    <PageContainer>
    <ProTable<API.UserInfoVO>
        columns={columns}
        actionRef={actionRef}
        request={async (
          params: any & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
        ) => {
          const res: any = await queryUserByConditionUsingPost({
            ...params,
          });
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey="key"
        toolBarRender={() => [
          <Button key="primary" type="primary" onClick={() => {
            handleUpdateModalOpen(true)
            setCurrentRow(undefined);
            setIsAddNew(true);
          }}>
            新增用户
          </Button>,
        ]}
      />
      <ShowDetailModal
          columns={columns}
          onCancel={() => {
            setShowDetail(false);
            if (!showDetail) {
              setCurrentRow(undefined);
            }
          }}
          onSubmit={async (values: any) => {
            console.log(values);
            setShowDetail(false);
            setCurrentRow(undefined);
          }}
          visible={showDetail}
          values={currentRow || {}}
        />
        <UserEditModal
        isAddNew={isAdd}
        initialValues={currentRow || {}}
        visible={updateModalOpen}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!updateModalOpen) {
            console.log("清除数据")
            setCurrentRow(undefined);
          }
        }}
        onSubmit={async (values: any) => {
          if (isAdd) {
            hadleAddUserInfo(values);
            setCurrentRow(undefined);
          } else {
            handleUpdateUserInfo(values);
            setCurrentRow(undefined);
          }

        }}
        />
    </PageContainer>
  );

}


