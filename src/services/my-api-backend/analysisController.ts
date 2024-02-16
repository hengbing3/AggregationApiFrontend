// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 统计接口使用 GET /api/analysis/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResultListInterfaceInfoVO>('/api/analysis/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}
