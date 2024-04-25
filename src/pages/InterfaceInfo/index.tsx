/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-02-07 23:07:58
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-04-25 23:16:36
 * @FilePath: \my-api-frontend\src\pages\InterfaceInfo\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  invokeInterfaceInfoUsingPost,
  queryByIdUsingGet,
} from '@/services/my-api-backend/interfaceInfoController';
import { PageContainer, ProCard, ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Card, Descriptions, Divider, Form, Input, Tabs, message } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 *
 * @returns 查看接口详情
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  // 使用 useParams 钩子函数获取动态路由参数
  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await queryByIdUsingGet({ id: params.id });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    // 请求完成，关闭loading
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  /**
   * 接口调用
   * @param values
   * @returns
   */
  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      // 发起请求调用接口，请求参数包含id和values属性
      const res = await invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values,
      });
      console.log('res', res)
      if (res.code === 200) {
        setInvokeRes(res.data);
        message.success('接口请求成功');
        return true;
      }
    } catch (error: any) {
      message.error('接口请求失败' + error.message);
      return false;
    } finally {
      setInvokeLoading(false);
    }
  };

  const [activeTabKey, setActiveTabKey] = useState('1');

  const onTabChange = (key: any) => {
    setActiveTabKey(key);
  };
  const [stateValue, setStateValue] = useState({});
  const style = {
    backgroundColor: '#f6f8fa',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    padding: '16px',
    overflow: 'auto',
    fontFamily: 'monospace',
  };

  return (
    <PageContainer title="查看接口文档">
      <ProCard>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </ProCard>
      <Divider />
      <ProCard>
        <ProForm name="invoke" layout="vertical" onFinish={onFinish}>
          <Tabs defaultActiveKey="1" onChange={onTabChange} activeKey={activeTabKey}>
            <TabPane tab="请求参数" key="1">
              <Form.Item name="userRequestParams">
                <Input.TextArea />
              </Form.Item>
            </TabPane>
            <TabPane tab="请求头部" key="2">
              <ProFormList
                name="headers"
                creatorButtonProps={{
                  position: 'bottom',
                }}
                {...stateValue}
              >
                <ProForm.Group key="group">
                  <ProFormText name="key" label="参数名称" width={'lg'}/>
                  <ProFormText name="value" label="参数值" width={'lg'}/>
                </ProForm.Group>
              </ProFormList>
            </TabPane>
          </Tabs>
        </ProForm>
      </ProCard>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
          <pre style={style}><code>{JSON.stringify(invokeRes, null, 2)}</code></pre>
      </Card>
    </PageContainer>
  );
};

export default Index;
