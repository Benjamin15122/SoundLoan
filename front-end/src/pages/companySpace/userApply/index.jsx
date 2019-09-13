import React, { PureComponent } from 'react';
import { Table, Divider, Tag } from 'antd';
import { statement } from '@babel/template';

const columns = [
  {
    title: '个人姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '申请金额',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '期望还款日期',
    dataIndex: 'deadline',
    key: 'deadline',
  },
  {
    title: '联系方式',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: '申请时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '申请状态',
    key: 'state',
    dataIndex: 'state',
  },
];

const data = [
  {
    key: '1',
    name: '小明',
    amount: '50000',
    deadline: '2019.10.30',
    contact: 'New York No. 1 Lake Park',
    time: '2018.10.30',
    state: '审核中',
  },
  {
    key: '2',
    name: '小红',
    amount: '100000',
    deadline: '2019.10.30',
    contact: 'New York No. 1 Lake Park',
    time: '2018.10.30',
    state: '审核中',
  },
  {
    key: '3',
    name: '小明',
    amount: '50000',
    deadline: '2019.10.30',
    contact: 'New York No. 1 Lake Park',
    time: '2018.10.30',
    state: '审核中',
  },
  {
    key: '4',
    name: '小明',
    amount: '50000',
    deadline: '2019.10.30',
    contact: 'New York No. 1 Lake Park',
    time: '2018.10.30',
    state: '审核中',
  },
];
class UserApply extends PureComponent {
  render() {
    return <Table columns={columns} dataSource={data} />;
  }
}
export default UserApply;
