/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-21 15:07:32
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-03-23 15:58:29
 * @FilePath: \AggregationApiFrontend\config\routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
  { name: '主页', path: '/', icon: 'smile', component: './Index' },
  { name: '接口申请', path: '/interface_apply', icon: 'smile', component: './InterfaceApply' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  {
    name: '登录',
    path: '/user',
    layout: false,
    routes: [{ path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理页',
    routes: [
      {
        icon: 'table',
        access: 'canAdmin',
        path: '/admin/interface-info',
        component: './Admin/InterfaceInfo',
        name: '接口管理',
      },
      {icon: 'analysis', access: 'canAdmin', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis', name: '接口分析'},
      {icon: 'success', access: 'canAdmin', path: '/admin/interface_audit', component: './Admin/InterfaceAudit', name: '接口审核'}
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', component: './Admin', name: "二级管理页" },
    ],
  },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
