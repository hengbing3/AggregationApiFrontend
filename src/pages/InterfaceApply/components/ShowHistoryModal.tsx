/*
 * @Author: Christer hongweibin3@gmail.com
 * @Date: 2024-01-21 15:07:32
 * @LastEditors: Christer hongweibin3@gmail.com
 * @LastEditTime: 2024-03-24 20:26:33
 * @FilePath: \my-api-frontend\src\pages\Admin\InterfaceInfo\components\UpdateModal.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  values: Partial<API.InterfaceInfoApplyRecordVO>[];
  columns: ProColumns<API.InterfaceInfoApplyRecordVO>[];
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时,将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.InterfaceInfoApplyRecordVO) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
};
const ShowHistoryModal: React.FC<Props> = (props) => {
  const { columns, values, visible, onCancel, onSubmit } = props;
  // 使用React的useRef创建一个引用，以访问ProTable中的表单实例
  const formRef = useRef<ProFormInstance>();
   // 防止修改的表单内容一直是同一个内容,要监听values的变化
  // 使用React的useEffect在值改变时更新表单的值
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);

  // 创建一个Modal组件,通过visible属性控制其显示或隐藏,footer设置为null把表单项的'取消'和'确认'按钮去掉
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()} width={1000}>
      <ProTable
        type="table"
        columns={columns}
        dataSource={values}
        onSubmit={async (valuse: API.InterfaceInfoApplyRecordVO) => {
          onSubmit?.(valuse);
        }}
        search={{
          optionRender: false,
          collapsed: false,
        }}
      />
    </Modal>
  );
};
export default ShowHistoryModal;
