// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户调用接口信息-根据id查看接口详情 GET /api/userInterfaceInfo */
export async function queryByIdUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultUserInterfaceInfo>('/api/userInterfaceInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户调用接口信息-编辑接口数据 PUT /api/userInterfaceInfo */
export async function updateUserInterFaceInfoUsingPut(
  body: API.UserInterfaceInfoUpdateParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/userInterfaceInfo', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户调用接口信息-新增数据 POST /api/userInterfaceInfo */
export async function addUserInterFaceInfoUsingPost(
  body: API.UserInterfaceInfoAddParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/userInterfaceInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户调用接口信息-删除数据 DELETE /api/userInterfaceInfo */
export async function deleteByIdUsingDelete1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByIdUsingDELETE1Params,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/userInterfaceInfo', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户调用接口信息-列表查询 POST /api/userInterfaceInfo/list */
export async function selectListByConditionUsingPost(
  body: API.QueryUserInterfaceInfoListParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultListUserInterfaceInfo>('/api/userInterfaceInfo/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户调用接口信息-分页查询 POST /api/userInterfaceInfo/page */
export async function queryByPageUsingPost1(
  body: API.QueryUserInterfaceInfoParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageUserInterfaceInfo>('/api/userInterfaceInfo/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
