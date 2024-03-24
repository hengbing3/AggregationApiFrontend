import { approveInterfaceInfoUsingPost, getDonePageUsingPost, getHistoryListUsingGet, getTodoPageUsingPost, queryInterfaceInfoApplyByIdUsingGet } from '@/services/my-api-backend/interfaceInfoController';
import type {
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProTable,
} from '@ant-design/pro-components';
import { Button,  Tabs, message,  } from 'antd';
import { useRef, useState } from 'react';
import ShowDetailModal from './components/ShowDetailModal';
import ShowHistoryModal from './components/ShowHistoryModal';
import AuditModal from './components/AuditModal';





export default () => {
  const [type, setType] = useState('todo');
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showHistoryList, setShowHistoryList] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoApply>();
  const [currentList, setCurrentList] = useState<API.InterfaceInfoApplyRecordVO[]>();
  const [auditModalOpen, handleAuditModalOpen] = useState<boolean>(false);
  const [currentAuditRow, setCurrentAuditRow] = useState<API.InterfaceInfoApplyAudit>();
  const actionRef = useRef<ActionType>();
  /**
   * 查看接口申请详情
   * @param record 接口信息
   */
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
  /**
   * 查看接口历史审核流程记录
   * @param record 接口申请信息
   */
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

  const handleAuditDetail = async (record: any) => {
    try {
      // 审核接口申请，查看详情
      const res: any = await queryInterfaceInfoApplyByIdUsingGet({ id: record.id });
      if (res.code === 200) {
        setCurrentAuditRow(res.data);
        handleAuditModalOpen(true);
      }
    } catch (error: any) {
      message.error('查询失败' + error.message);
    }
  };
  /**
   * 接口审核
   * @param params
   * @returns
   */
  const handleAudit = async (params: any) => {

    const hide = message.loading('正在审核');
    try {
      await approveInterfaceInfoUsingPost({
        id: currentAuditRow?.id,
        processInstanceId: currentAuditRow?.processInstanceId,
        ...params,
      });
      hide();
      message.success('审核成功！');
      actionRef.current?.reload();
      // 创建成功就关闭这个模态框
      handleAuditModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('审核失败' + error.message);
      return false;
    }
  };

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
          status: 'Processing',
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
        record.auditStatus === '0' || record.auditStatus === '1' ? (
          <Button
            type="link"
            key="onlineKey"
            onClick={() => {
              handleAuditDetail(record);
            }}
          >
            处理
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

  const historyAuditColumns: ProColumns<API.InterfaceInfoApplyRecordVO>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 64,
      valueType: 'indexBorder',
      hideInTable: true,
    },
    {
      title: '接口申请id',
      dataIndex: 'id',
      width: 64,
      valueType: 'indexBorder',
      hideInTable: true,
      hideInForm: true,
      hideInSearch: true,
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

  const auditColumns: ProColumns<API.InterfaceInfoApplyAudit>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '流程实例id',
      dataIndex: 'processInstanceId',
      width: 64,
      valueType: 'indexBorder',
      hideInForm: true,
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
    {
      title: '审核结果',
      key: 'auditResult',
      dataIndex: 'auditResult',
      valueType: 'select',
      valueEnum: {
        '0': { text: '不通过', status: 'Error' },
        '1': {text: '通过', status: 'Success',},
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '审核意见',
      dataIndex: 'auditOpinion',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    }
  ];



  return (
    <PageContainer>
        <ProCard>
      <Tabs activeKey={type} onChange={(e) => setType(e)}>
        <Tabs.TabPane tab="待办事项" key="todo" />
        <Tabs.TabPane tab="已办事项" key="done" />
      </Tabs>
      {type === 'todo' && (
        <ProTable<API.InterfaceInfoApply>
          columns={columns}
          actionRef={actionRef}
          type={type as 'table'}
          request={async (
            params: any & {
              pageSize?: number;
              current?: number;
              keyword?: string;
            },
          ) => {
            const res: any = await getTodoPageUsingPost({
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
        />
      )}
      {type === 'done' && (
        <ProTable<API.InterfaceInfoApply>
        columns={columns}
        type={type as 'table'}
        request={async (
          params: any & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
        ) => {
          const res: any = await getDonePageUsingPost({
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
      />
      )}
    </ProCard>
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
      <AuditModal
        columns={auditColumns}
        onCancel={() => {
          handleAuditModalOpen(false);
          if (!auditModalOpen) {
            setCurrentAuditRow(undefined);
          }
        }}
        onSubmit={async (values: any) => {
          const flag = await handleAudit(values);
          if (flag) {
            handleAuditModalOpen(false);
            setCurrentAuditRow(undefined);
          }
        }}
        visible={auditModalOpen}
        values={currentAuditRow || {}}
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
