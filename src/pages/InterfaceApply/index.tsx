import {
  applyInterfaceInfoUsingPost,
  getHistoryListUsingGet,
  myInterfaceInfoApplyPageUsingPost,
  queryInterfaceInfoApplyByIdUsingGet,
  reApplyInterfaceInfoUsingPost,
} from '@/services/my-api-backend/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Tabs, message } from 'antd';
import { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';
import ShowDetailModal from './components/ShowDetailModal';
import ShowHistoryModal from './components/ShowHistoryModal';
import UpdateModal from './components/UpdateModal';

export default () => {
  const [type, setType] = useState('table');
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showHistoryList, setShowHistoryList] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoApply>();
  const [currentList, setCurrentList] = useState<API.InterfaceInfoApplyRecordVO[]>();
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

  const handleShowDetail = async (record: any) => {
    try {
      const res: any = await queryInterfaceInfoApplyByIdUsingGet({ id: record.id });
      if (res.code === 200) {
        setCurrentRow(res.data);
        setShowDetail(true);
      }
    } catch (error: any) {
      message.error('查询失败' + error.message);
    }
  };
  const handleUpdateDetail = async (record: any) => {
    try {
      // 更新接口申请，查看详情
      const res: any = await queryInterfaceInfoApplyByIdUsingGet({ id: record.id });
      if (res.code === 200) {
        setCurrentRow(res.data);
        handleUpdateModalOpen(true);
      }
    } catch (error: any) {
      message.error('查询失败' + error.message);
    }
  }
  const handleUpdate = async (params: any) => {
    const hide = message.loading('正在编辑');
    try {
      await reApplyInterfaceInfoUsingPost({
        ...params,
      });
      hide();
      message.success('编辑成功！');
      actionRef.current?.reload();
      // 创建成功就关闭这个模态框
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('编辑失败' + error.message);
      return false;
    }
  }

  const handleViewHistory = async (record: any) => {
    try {
      const res: any = await getHistoryListUsingGet({ interfaceInfoApplyId: record.id });
      if (res.code === 200) {
        setCurrentList(res.data);
        setShowHistoryList(true);
      }
    } catch (error: any) {
      message.error('查询历史流程记录失败' + error.message);
    }
  };

  const showDetailColumns: ProColumns<API.InterfaceInfoApply>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      readonly: true,
    },
    {
      title: '请求类型',
      dataIndex: 'method',
      filters: true,
      onFilter: true,
      readonly: true,
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
      readonly: true,
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      valueType: 'text',
      readonly: true,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      hideInSearch: true,
      readonly: true,
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      hideInSearch: true,
      readonly: true,
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      hideInSearch: true,
      readonly: true,
    },
    {
      title: '代码块',
      dataIndex: 'codeJson',
      valueType: 'jsonCode',
      hideInSearch: true,
      readonly: true,
    },
  ];
  const columns: ProColumns<API.InterfaceInfoApply>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 64,
      valueType: 'indexBorder',
    },
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      hideInTable: true,
      hideInSearch: true,
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
        '0': {
          text: 'API审核中',
          status: 'Default',
        },
        '1': {text:'API开放审核中', status: 'Processing'},
        '2': {text: 'API审核不通过', status: 'Error'},
        '3': {text: 'API开放不通过', status: 'Error'},
        '4': {text: 'API申请通过', status: 'Success'},
      },
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      render: (_, record) => [
        <Button
          type="link"
          key="viewKey"
          onClick={() => {
            handleShowDetail(record);
          }}
        >
          查看详情
        </Button>,
        record.auditStatus === '2' || record.auditStatus === '3' ? (
          <Button
            type="link"
            key="onlineKey"
            onClick={() => {
              handleUpdateDetail(record);
            }}
          >
            编辑
          </Button>
        ) : null,
        <Button
          type="link"
          key="viewHisKey"
          onClick={() => {
            handleViewHistory(record);
          }}
        >
          查看历史流程记录
        </Button>,
      ],
    },
  ];

  const updateColumns: ProColumns<API.InterfaceInfoApply>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      hideInTable: true,
      hideInSearch: true,
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

  const historyAuditColumns: ProColumns<API.InterfaceInfoApplyRecordVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 64,
      valueType: 'indexBorder',
    },
    {
      title: '接口申请id',
      dataIndex: 'id',
      width: 64,
      valueType: 'indexBorder',
      hideInTable: true,
    },
    {
      title: '流程节点名称',
      dataIndex: 'processNode',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: false,
      width: 100,
    },
    {
      title: '流程节点id',
      dataIndex: 'processNodeId',
      width: 64,
      valueType: 'indexBorder',
      hideInTable: true,
    },
    {
      title: '审核用户名称',
      dataIndex: 'auditUserName',
      valueType: 'text',
      hideInTable: false,
      hideInSearch: true,
      width: 100,
    },
    {
      title: '审核结果',
      key: 'auditResult',
      hideInTable: false,
      hideInSearch: true,
      dataIndex: 'auditResult',
      filters: false,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '0': '不通过',
        '1': '通过',
      },
    },
    {
      title: '审核意见',
      dataIndex: 'auditOpinion',
      hideInTable: false,
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '审核用户ID',
      dataIndex: 'auditUserId',
      width: 64,
      valueType: 'indexBorder',
      hideInTable: true,
    },
    {
      title: '申请用户名称',
      dataIndex: 'createUserName',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProCard>
        <Tabs activeKey={type} onChange={(e) => setType(e)}>
          <Tabs.TabPane tab="接口申请" key="table" />
        </Tabs>
        {['table', 'form'].includes(type) && (
          <ProTable<API.InterfaceInfoApply>
            columns={columns}
            type={type as 'table'}
            actionRef={actionRef}
            request={async (
              params: any & {
                pageSize?: number;
                current?: number;
                keyword?: string;
              },
            ) => {
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
            }}
            pagination={{
              pageSize: 10,
            }}
            rowKey="id"
            dateFormatter="string"
            toolBarRender={() => [
              <Button
                key="3"
                type="primary"
                onClick={() => {
                  handleModalOpen(true);
                }}
              >
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
        }}
        // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据(这里的报错不用管,可能里面组件的属性和外层的不一致)
        onSubmit={async (values: any) => {
          const flag = await handleAdd(values);
          if (flag) {
            handleModalOpen(false);
            setCurrentRow(undefined);
          }
        }}
        visible={createModalOpen}
      />
      <UpdateModal
        columns={updateColumns}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        onSubmit={async (values: any) => {
          const flag = await handleUpdate(values);
          if (flag) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />
      <ShowDetailModal
        columns={showDetailColumns}
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
      <ShowHistoryModal
        columns={historyAuditColumns}
        onCancel={() => {
          setShowHistoryList(false);
          if (!showHistoryList) {
            setCurrentRow(undefined);
          }
        }}
        onSubmit={async (values: any) => {
          console.log(values);
          setShowHistoryList(false);
          setCurrentRow(undefined);
        }}
        visible={showHistoryList}
        values={currentList || []}
      />
    </PageContainer>
  );
};
