// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户详情查询 GET /api/user */
export async function queryUserInfoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultUserInfoVO>('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户编辑 PUT /api/user */
export async function editUserInfoUsingPut(
  body: API.UserUpdateParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增用户 POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddParam, options?: { [key: string]: any }) {
  return request<API.CommonResultVoid>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 PUT /api/user/changePassword */
export async function changePassWordUsingPut(
  body: API.ChangePasswordParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/user/changePassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 当前登录用户信息 GET /api/user/info */
export async function getUserInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.CommonResultUserInfoVO>('/api/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户登录 POST /api/user/login */
export async function loginUserUsingPost(
  body: API.UserLoginParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultstring>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.CommonResultVoid>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户分页查询 POST /api/user/page */
export async function queryUserByConditionUsingPost(
  body: API.UserQueryParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultPageUserInfoVO>('/api/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /api/user/register */
export async function registerUserUsingPost(
  body: API.UserRegisterParam,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultlong>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 PUT /api/user/resetPassword */
export async function resetPasswordUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPasswordUsingPUTParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResultVoid>('/api/user/resetPassword', {
    method: 'PUT',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
