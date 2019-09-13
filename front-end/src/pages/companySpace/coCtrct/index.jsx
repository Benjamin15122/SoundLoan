import React, { PureComponent } from 'react';
import { Table, Divider, Tag, Button, Modal, Radio, message } from 'antd';
import { Select } from 'antd';
import { getEntLoanApply } from '@/services/enterprise';
import {connect} from 'dva';

const { Option } = Select;


@connect(({user}) => ({user}))
class CoCtrct extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      allRecord: [],
      options: CoCtrct.allOptions,
      operatingRecord: undefined,
      showAuditing: false,
      auditingValue: 'true',
    }
  }

  columns = [
    {
      title: '个人姓名',
      dataIndex: 'ind_user_name',
      render: text => <a>{text}</a>,
    },
    {
      title: '申请金额',
      dataIndex: 'loan_money',
    },
    {
      title: '期望还款日期',
      dataIndex: 'due_date_timestamp',
    },
    {
      title: '违约概率',
      dataIndex: 'default_prob',
    },
    {
      title: '申请时间',
      dataIndex: 'app_date_timestamp',
    },
    {
      title: '申请状态',
      dataIndex: 'order_status',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record, index) => {
        switch (record['order_status']) {
          case 'applied':
            return <Button onClick={() => {
              this.setState({ showAuditing: true, operatingRecord: record });
            }}>审核</Button>;
          case 'auditing':
            return <Button>上传合同</Button>;
          case 'uploading_contract':
            return <b>已上传合同</b>
        }
      }
    },
  ];

  componentDidMount() {
    (async () => {
      const res = await getEntLoanApply(this.props.user.name);
      this.setState({ allRecord: res });
      console.log(res);
    })();
  }

  static allOptions = ['applied', "auditing", "uploading_contract"];

  handleChange = (value) => {
    this.setState({
      options: value === 'all'? CoCtrct.allOptions: [value]
    });
  };

  getRecords = () => {
    const { allRecord, options } = this.state;
    return allRecord.filter((value) => options.indexOf(value['order_status']) >= 0);
  };

  onAuditing = () => {
    const { operatingRecord, auditingValue } = this.state;
    operatingRecord['order_status'] = auditingValue === 'true' ? 'auditing': 'finished';
    message.success('操作成功');
    this.setState({ showAuditing: false });
  };

  render() {
    const { showAuditing } = this.state;

    return <>
      <div>
        <Select defaultValue="all" style={{ width: 200 }} onChange={this.handleChange}>
          <Option value="all">全部</Option>
          <Option value="applied">未审核</Option>
          <Option value="auditing">待上传合同</Option>
          <Option value="uploading_contract">上传完成</Option>
        </Select>
        <Table columns={this.columns} dataSource={this.getRecords()} />
      </div>
      <Modal title='审核贷款申请' visible={showAuditing}
             onCancel={() => this.setState({ showAuditing: false })}
             onOk={this.onAuditing}>
        <Radio.Group defaultValue='true' onChange={value => this.setState({ auditingValue: value})}>
          <Radio value='true'>通过</Radio>
          <Radio value='false'>不通过</Radio>
        </Radio.Group>
      </Modal>
    </>;
  }
}
export default CoCtrct;
