import React, { Component } from 'react';
import { Form, Input, Select, InputNumber, Button, Icon, Table } from 'antd';

import { getRecommendedEnterprises, searchEnterprises } from '@/services/entInfo';
import { connect } from 'dva';
import Link from 'umi/link';
import LoanInfo from './loanInfo';
import { SSL_OP_SINGLE_DH_USE } from 'constants';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

@connect(({ user }) => ({ user }))
class ChooseEnt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchInput: '',
      showSearchResult: false,
      searchResult: [],
      recommendedResult: [],
    }
  }

  async componentDidMount() {
    const asyncRes = getRecommendedEnterprises(this.props.user.currentUser.nickname);
    this.setState({ loading: true });
    const results = await asyncRes;
    this.setState({ loading: false, recommendedResult: results });
  }

  static gotoDetails = (company_name) => {

  };

  static columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: (text) => <Link to={'/entInfo/details?company_name=' + text}>{text}</Link>,
    },
    { title: '用户评分', dataIndex: 'credit_score' },
    { title: '企业地址', dataIndex: 'address' },
    { title: '企业官网', dataIndex: 'website' },
    { title: '联系方式', dataIndex: 'contact' },
    { title: '是否申请', 
      dataIndex: 'apply_state',
      render: () => <Button type='primary'><Link to={'/askLoanInfo'}>立即申请</Link></Button>,
    },
  ];

  onChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onSearch = async () => {
    this.setState({ loading: true });
    const results = await searchEnterprises(this.state.searchInput);
    this.setState({ loading: false, searchResult: results, showSearchResult: true });
  };

  onCancel = () => {
    this.setState({ showSearchResult: false });
  };

  getTableTitle = (showSearchResult) => {
    return !showSearchResult? <b>企业推荐</b>:
      <b>企业搜索
        <Button shape='circle' style={{ height: '100%', marginLeft: '3px'}}
                onClick={this.onCancel}>
          <Icon type='close'/>
        </Button>
      </b>;
  };

    render() {
    const { loading, showSearchResult, searchResult, recommendedResult } = this.state;
    return <div>
      <Form layout='inline'>
        <Form.Item label="排序方式">
          <Select defaultValue="1" style={{width:'100%'}}>
            <Option value="1">评价</Option>
            <Option value="2">时间</Option>
            <Option value="3">地址</Option>
          </Select>
        </Form.Item>

        <Form.Item label="筛选条件：城市 ">
          <Select defaultValue="1">
            <Option value="1">全部</Option>
            <Option value="2">北京</Option>
            <Option value="3">上海</Option>
            <Option value="4">南京</Option>
          </Select>
        </Form.Item>

        <Form.Item label="可接受年利率上限">
          <Form.Item>
             <InputNumber placeholder="请输入"/>
          </Form.Item>
          <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>%</span>
        </Form.Item>
      </Form>
      
      <div style={{ paddingTop: '10px' }}>
        <Table title={() => this.getTableTitle(showSearchResult)} loading={loading}
               columns={ChooseEnt.columns} rowKey='name'
               dataSource={showSearchResult? searchResult: recommendedResult} />
      </div>
    </div>
  }
}

export default ChooseEnt;
