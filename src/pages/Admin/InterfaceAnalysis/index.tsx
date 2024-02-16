/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-28 17:56:26
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-02-16 23:11:13
 * @FilePath: \my-api-frontend\src\pages\InterfaceInfo\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE<
 */
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { listTopInvokeInterfaceInfoUsingGet } from '@/services/my-api-backend/analysisController';
import { message } from 'antd';

const InterfaceAnalysis: React.FC = () => {
  // 存储数据的状态
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  // 控制加载状态的状态，默认加载中(true)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGet().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false)
    }
  },[])

  const chartData = data.map((item) => ({
    value: item.totalNum,
    name: item.name,
  }))


  const option = {
    title: {
      text: '调用次数最多的接口TOP3',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer>
      <ReactECharts loadingOption={{showloading:loading}} option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
