/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-02-07 19:11:34
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-02-07 19:17:42
 * @FilePath: \my-api-frontend\src\requestConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: 'http://localhost:8101',
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('');
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      console.log('data',data)
      // 当响应状态码不等于 200 抛出错误
      if (data.code !== 200) {
        throw new Error(data.message);
      }
      return response;
    },
  ],
};
