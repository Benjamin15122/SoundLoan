import React from 'react';
import { Card, Table } from 'antd';
import styles from './index.css';

const fakeLoans = [
  {
    client: '阿里巴巴',
    amount: '￥100,000,000',
    applyTime: '4:55',
    state: '还不起',
  },
];

class Loans extends React.Component {
  render() {
    return (
      <Card className={styles.container}>
        <Table columns={this.columns} dataSource={fakeLoans} />
      </Card>
    );
  }

  columns = [
    {
      title: '企业名称',
      key: 'id',
      render: loan => <span>{loan.client}</span>,
    },
    {
      title: '贷款金额',
      key: 'id',
      render: loan => <span>{loan.amount}</span>,
    },
    {
      title: '申请时间',
      key: 'id',
      render: loan => <span>{loan.applyTime}</span>,
    },
    {
      title: '申请状态',
      key: 'id',
      render: loan => <span>{loan.state}</span>,
    },
  ];
}

export default Loans;
