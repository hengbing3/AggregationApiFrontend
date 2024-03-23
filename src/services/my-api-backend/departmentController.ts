// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** editDepartment PUT /api/department */
export async function editDepartmentUsingPut(
  body: API.DepartmentEditParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/department', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addDepartment POST /api/department */
export async function addDepartmentUsingPost(
  body: API.DepartmentAddParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/department', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteDepartment DELETE /api/department */
export async function deleteDepartmentUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDepartmentUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/department', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** selectDepartmentPage POST /api/department/page */
export async function selectDepartmentPageUsingPost(
  body: API.DepartmentPageParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageDepartmentVO>('/api/department/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
