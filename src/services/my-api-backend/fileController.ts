// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** uploadFiles POST /api/files/upload */
export async function uploadFilesUsingPost(body: string[], options?: { [key: string]: any }) {
  return request<API.CommonResultListstring>('/api/files/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
