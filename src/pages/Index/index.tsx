/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-21 15:07:32
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-03-20 23:11:37
 * @FilePath: \my-api-frontend\src\pages\Index\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { queryByPageUsingPost } from '@/services/my-api-backend/interfaceInfoController';
import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { Button, Dropdown, List, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateModal from './components/CreateModal';

const Index: React.FC = () => {

  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);

  const loadData = async (current = 1, pageSize = 10) => {
    // 开始加载数据，设置loading为true
    setLoading(true);
    try {
      const res = await queryByPageUsingPost({
        current,
        pageSize,
      });
      setList(res.data?.records ?? []);
      setTotal(res.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
    setLoading(false);
  };
  const handleApply = () => {
    // 处理申请接口的逻辑
    handleModalOpen(true)
  }
  useEffect(() => {
    loadData();
  }, []);

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
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: 'GET',
            value: 'GET',
          },
          {
            label: 'POST',
            value: 'POST',
          },
          {
            label: 'PUT',
            value: 'PUT',
          },
          {
            label: 'DELETE',
            value: 'DELETE',
          },
        ],
      },
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
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
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
    }
  ];

  return (
    <PageContainer
    title="在线接口开发平台"
    extra={[
      <Button key="apply" type="primary" onClick={handleApply} style={{marginTop: '10px'}}>
        申请接口
      </Button>,
    ]}
    style={{
      backgroundColor: '#f7f7f7',
      padding: '20px',
      border: '1px solid #e8e8e8',
      borderRadius: '4px',
    }}
    >

      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          // 构建列表项链接地址
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item actions={[<a key={item.id} href={apiLink}>查看</a>]}>
            <List.Item.Meta
            // 列表项标题显示为可点击的链接
              title={<a href={apiLink}>{item.name}</a>}
            // 列表项描述
              description={item.description}
            />
            </List.Item>
          );
        }}
        // 分页配置
        pagination={{
          showTotal(total: number) {
            return `共 ${total} 条`;
          },
          defaultPageSize: 10,
          pageSizeOptions: ['5', '10', '20', '30'],
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
          showSizeChanger: true,
          onShowSizeChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        } }
        // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据(这里的报错不用管,可能里面组件的属性和外层的不一致)
        onSubmit={async (values) => {
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

export default Index;
