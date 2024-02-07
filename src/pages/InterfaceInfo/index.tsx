/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-02-07 23:07:58
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-02-07 23:39:17
 * @FilePath: \my-api-frontend\src\pages\InterfaceInfo\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { queryByIdUsingGet } from '@/services/my-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, message } from 'antd';

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';


/**
 *
 * @returns 查看接口详情
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  // 使用 useParams 钩子函数获取动态路由参数
  const params = useParams();

  const loadData = async () => {
    if(!params.id) {
      message.error('接口不存在');
      return;
    }
    setLoading(true);
    try {
        const res = await queryByIdUsingGet({id: params.id});
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

  return (
    <PageContainer title="查看接口文档">
    <Card>
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
      </Card>
  </PageContainer>
  );
};

export default Index;
