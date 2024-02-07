/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-21 15:07:32
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-02-07 22:44:45
 * @FilePath: \my-api-frontend\src\pages\Index\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { queryByPageUsingPost } from '@/services/my-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);

  const loadData = async (current = 1, pageSize = 5) => {
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
  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="在线接口开发平台">
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item actions={[<a key="list-loadmore-edit">查看</a>]}>
            <List.Item.Meta
              title={<a href={'https://ant.design'}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
        // 分页配置
        pagination={{
          showTotal(total: number) {
            return `共 ${total} 条`;
          },
          pageSize: 5,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
