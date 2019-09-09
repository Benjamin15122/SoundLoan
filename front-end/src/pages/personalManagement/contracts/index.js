import React from 'react';
import { Card, Table, Select } from 'antd';
import styles from './index.css';

const { Option } = Select;

const fakeContracts = [
  {
    client: '阿里巴巴',
    amount: '￥100,000,000',
    applyTime: '4:55',
    state: '还不起',
  },
];

const fakeContractType = ['一种', '另一种'];

class Contracts extends React.Component {
  render() {
    const contractFilter = (
      <div className={styles.contractFilterDiv}>
        <span>合同类别:</span>
        <Select dropdownClassName={styles.contractSelector}>
          {fakeContractType.map(type => (
            <Option value={type} key={type}>
              {type}
            </Option>
          ))}
        </Select>
      </div>
    );

    const contractTable = <Table columns={this.columns} dataSource={fakeContracts} />;

    return (
      <Card className={styles.container}>
        {contractFilter}
        {contractTable}
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
export default Contracts;
