import { applyInterfaceInfoUsingPost, myInterfaceInfoApplyPageUsingPost } from '@/services/my-api-backend/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type {
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Tabs, message } from 'antd';
import { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';



const columns: ProColumns<API.InterfaceInfoApplyVO>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 64,
    valueType: 'indexBorder',
  },
  {
    title: '名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    title: '请求类型',
    dataIndex: 'method',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      GET: { text: 'GET', status: 'Default' },
      POST: {
        text: 'POST',
        status: 'Default',
      },
      PUT: {
        text: 'PUT',
        status: 'Default',
      },
      DELETE: {
        text: 'DELETE',
        status: 'Default',
      },
    },
  },
  {
    title: '审核状态',
    key: 'auditStatus',
    hideInTable: false,
    dataIndex: 'auditStatus',
    filters: false,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      '0': 'API审核中',
      '1': 'API开放审核中',
      '2': 'API审核不通过',
      '3': 'API开放不通过',
      '4': 'API申请通过',
    },
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    render: (_, record) => [
      <Button
        type="text"
        key="viewKey"
        onClick={() => {
          handleUpdateModalOpen(true);
          setCurrentRow(record);
        }}
      >
        查看详情
      </Button>,
       record.auditStatus === '2' || record.auditStatus === '3' ? (
        <Button
          type="text"
          key="onlineKey"
          onClick={() => {
            handleOnline(record);
          }}
        >
          编辑
        </Button>
      ) : (
        null
      ),
      <Button
        type="text"
        key="viewKey"
        onClick={() => {
          handleUpdateModalOpen(true);
          setCurrentRow(record);
        }}
      >
        查看历史流程记录
      </Button>,
    ]
  },
];

const applyColumns: ProColumns<API.InterfaceInfoApplyParam>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 64,
    valueType: 'indexBorder',
  },
  {
    title: '名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '请求类型',
    dataIndex: 'method',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      GET: { text: 'GET', status: 'Default' },
      POST: {
        text: 'POST',
        status: 'Default',
      },
      PUT: {
        text: 'PUT',
        status: 'Default',
      },
      DELETE: {
        text: 'DELETE',
        status: 'Default',
      },
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    valueType: 'textarea',
  },
  {
    title: '接口地址',
    dataIndex: 'url',
    valueType: 'text',
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    valueType: 'jsonCode',
    hideInSearch: true,
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    valueType: 'jsonCode',
    hideInSearch: true,
  },
  {
    title: '响应头',
    dataIndex: 'responseHeader',
    valueType: 'jsonCode',
    hideInSearch: true,
  },
  {
    title: '代码块',
    dataIndex: 'codeJson',
    valueType: 'jsonCode',
    hideInSearch: true,
  },

];

export default () => {
  const [type, setType] = useState('table');
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const actionRef = useRef<ActionType>();
  /**
   * @en-US Add node
   * @zh-CN 接口申请
   * @param fields
   */
const handleAdd = async (params: API.InterfaceInfoApplyParam) => {
  const hide = message.loading('正在添加');
  try {
    await applyInterfaceInfoUsingPost({
      ...params,
    });
    hide();
    message.success('创建成功！');
    actionRef.current?.reload();
    // 创建成功就关闭这个模态框
    handleModalOpen(false);
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败' + error.message);
    return false;
  }
};
  return (
    <PageContainer>
      <ProCard>
      <Tabs activeKey={type} onChange={(e) => setType(e)}>
        <Tabs.TabPane tab="接口申请" key="table" />
      </Tabs>
      {['table', 'form'].includes(type) && (
        <ProTable<API.InterfaceInfoApplyVO>
          columns={columns}
          type={type as 'table'}
          actionRef={actionRef}
          request={
            async (
              params: U & {
                pageSize?: number;
                current?: number;
                keyword?: string;
              },) => {
                const res: any = await myInterfaceInfoApplyPageUsingPost({
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
              }
          }
          pagination={{
            pageSize: 10,
          }}
          rowKey="id"
          dateFormatter="string"
          toolBarRender={() => [
            <Button key="3" type="primary" onClick={
              () => {
                handleModalOpen(true)
              }
            }>
              <PlusOutlined />
              新增
            </Button>,
          ]}
        />
      )}
    </ProCard>
    <CreateModal
        columns={applyColumns}
        onCancel={() => {
          handleModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        } }
        // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据(这里的报错不用管,可能里面组件的属性和外层的不一致)
        onSubmit={async (values: any) => {
          const flag = await handleAdd(values);
          if (flag) {
            handleModalOpen(false);
            setCurrentRow(undefined);
          }
        } }
        visible={createModalOpen} />
    </PageContainer>
  );
};
