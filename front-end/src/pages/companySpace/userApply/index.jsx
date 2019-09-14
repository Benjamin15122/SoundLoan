import React, { PureComponent } from 'react';
import { Table, Divider, Tag, Button, Modal, Radio, message, Input } from 'antd';
import { Select } from 'antd';
import { getEntLoanApply } from '@/services/enterprise';
import {connect} from 'dva';

const { Option } = Select;


@connect(({user}) => ({user}))
class UserApply extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      allRecord: [],
      options: UserApply.allOptions,
      operatingRecord: undefined,
      showAuditing: false,
      auditingValue: 'true',
      showUpload: false,
      uploadForm: {
        contract_title: '', individual_name: '', enterprise_name: '', contract_content: '',
      },
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
      render: () => '2019-05-05',
    },
    {
      title: '违约概率',
      dataIndex: 'default_prob',
    },
    {
      title: '申请时间',
      dataIndex: 'app_date_timestamp',
      render: () => '2020-09-09',
    },
    {
      title: '申请状态',
      dataIndex: 'order_status',
      render: (text) => {
        switch (text) {
          case 'applied': return '待审核';
          case 'auditing': return '待上传合同';
          case 'uploading_contract': return '合同已上传';
        }
      }
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
            return <Button onClick={() => {
              this.setState({ showUpload: true, operatingRecord: record, uploadForm: {} });
            }}>上传合同</Button>;
          case 'uploading_contract':
            return <b>--</b>
        }
      }
    },
  ];

  componentDidMount() {
    (async () => {
      const res = await getEntLoanApply(this.props.user.name);
      this.setState({ allRecord: res });
    })();
  }

  static allOptions = ['applied', "auditing", "uploading_contract"];

  handleChange = (value) => {
    this.setState({
      options: value === 'all'? UserApply.allOptions: [value]
    });
  };

  getRecords = () => {
    const { allRecord, options } = this.state;
    return allRecord.filter((value) => options.indexOf(value['order_status']) >= 0);
  };

  onAuditing = () => {
    const { operatingRecord, auditingValue } = this.state;
    operatingRecord['order_status'] = auditingValue === 'true' ? 'auditing': 'finished';
    console.debug('some thing to do');
    message.success('操作成功');
    this.setState({ showAuditing: false });
  };

  onChangeContract = (property) => (value) => {
    const { uploadForm } = this.state;
    this.setState({ uploadForm: { ...uploadForm, [property]: value }});
  };

  onUpload = () => {
    const { operatingRecord, uploadForm } = this.state;
    operatingRecord['order_status'] = 'uploading_contract';
    console.debug('some thing to do');
    message.success('上传成功');
    this.setState({ showUpload: false });
  };

  render() {
    const { showAuditing, showUpload, uploadForm } = this.state;
    const contractInputStyle = { paddingTop: '20px' };
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
      <Modal title='上传合同' visible={showUpload}
             onCancel={() => this.setState({ showUpload: false })}
             onOk={this.onUpload}>
        <Input addonBefore='合同名称'
               onChange={this.onChangeContract('contract_title')}
               style={contractInputStyle}
        />
        <Input addonBefore='借款者'
               onChange={this.onChangeContract('individual_name')}
               style={contractInputStyle}
        />
        <Input addonBefore='放贷企业'
               onChange={this.onChangeContract('enterprise_name')}
               style={contractInputStyle}
        />
        <h6 style={{ paddingTop: '20px' }}>合同内容</h6>
        <Input.TextArea rows={4}
                        onChange={this.onChangeContract('contract_content')}
        />
      </Modal>
    </>;
  }
}
export default UserApply;
