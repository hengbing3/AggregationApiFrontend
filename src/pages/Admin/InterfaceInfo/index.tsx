/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-28 17:56:26
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-02-07 15:48:33
 * @FilePath: \my-api-frontend\src\pages\InterfaceInfo\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE<
 */
import {
  addInterFaceInfoUsingPost,
  deleteByIdUsingDelete,
  editInterFaceInfoUsingPut,
  onlineInterfaceInfoUsingPut,
  queryByPageUsingPost,
  outlineInterfaceInfoUsingPut
} from '@/services/my-api-backend/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';
import DeleteModal from './components/DeleteModal';
import UpdateModal from './components/UpdateModal';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, handleDeleteModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (params: API.InterfaceInfoParam) => {
    const hide = message.loading('正在添加');
    try {
      await addInterFaceInfoUsingPost({
        ...params,
      });
      hide();
      message.success('创建成功！');
      // 创建成功就关闭这个模态框
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoParam) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中...');
    try {
      await editInterFaceInfoUsingPut({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('操作成功！');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败:' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await deleteByIdUsingDelete({
        id: selectedRows.id,
      });
      hide();
      message.success('删除成功');
      // 删除成功，自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param selectedRows
   */
  const handleOnline = async (selectedRows: API.onlineInterfaceInfoUsingPUTParams) => {
    const hide = message.loading('发布中');
    if (!selectedRows) return true;
    try {
      await onlineInterfaceInfoUsingPut({
        id: selectedRows.id,
      });
      hide();
      message.success('发布成功');
      // 删除成功，自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('发布失败' + error.message);
      return false;
    }
  };

   /**
   *  Delete node
   * @zh-CN 发布接口
   *
   * @param selectedRows
   */
   const handleOutline = async (selectedRows: API.outlineInterfaceInfoUsingPUTParams) => {
    const hide = message.loading('下线中');
    if (!selectedRows) return true;
    try {
      await outlineInterfaceInfoUsingPut({
        id: selectedRows.id,
      });
      hide();
      message.success('下线成功');
      // 删除成功，自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('下线失败' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
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
      title: '请求类型',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'textarea',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="text"
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </Button>,
        record.status === 0 ? (
          <Button
            type="text"
            key="onlineKey"
            onClick={() => {
              handleOnline(record);
            }}
          >
            发布
          </Button>
        ) : (
          <Button
            type="text"
            key="outlineKey"
            onClick={() => {
              handleOutline(record);
            }}
          >
            下线
          </Button>
        ),
        <Button
          type="text"
          danger
          key="deleteKey"
          onClick={() => {
            handleDeleteModalOpen(true);
            setCurrentRow(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          params: U & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
        ) => {
          const res: any = await queryByPageUsingPost({
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
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <UpdateModal
        // 要传递columns 不然修改模态框没有表单项
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        // 要传递的表单控制开关，改为visible
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <DeleteModal
        onSubmit={async (value) => {
          const success = await handleRemove(value);
          if (success) {
            handleDeleteModalOpen(false);
            setCurrentRow(undefined);
          }
        }}
        onCancel={() => {
          handleDeleteModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={deleteModalOpen}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据(这里的报错不用管,可能里面组件的属性和外层的不一致)
        onSubmit={async (values) => {
          handleAdd(values);
        }}
        visible={createModalOpen}
      />
    </PageContainer>
  );
};
export default TableList;
