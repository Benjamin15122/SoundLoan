import React, { Component } from 'react';
import { Button, Icon, Input, Table } from 'antd';
import { getRecommendedEnterprises, searchEnterprises } from '@/services/entInfo';
import { connect } from 'dva';
import Link from 'umi/link';
import LoanInfo from './loanInfo';

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
    };
  }

  async componentDidMount() {
    const asyncRes = getRecommendedEnterprises(this.props.user.currentUser.nickname);
    this.setState({ loading: true });
    const results = await asyncRes;
    this.setState({ loading: false, recommendedResult: results });
  }

  static gotoDetails = company_name => {};

  static columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
      render: text => <Link to={'/entInfo/details?company_name=' + text}>{text}</Link>,
    },
    { title: '用户评分', dataIndex: 'credit_score' },
    { title: '企业地址', dataIndex: 'address' },
    { title: '企业官网', dataIndex: 'website' },
    { title: '联系方式', dataIndex: 'contact' },
    {
      title: '是否申请',
      dataIndex: 'apply_state',
      render: () => <Link to={'/askLoanInfo'}>立即申请</Link>,
    },
  ];

  onChange = e => {
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

  getTableTitle = showSearchResult => {
    return !showSearchResult ? (
      <b>企业推荐</b>
    ) : (
      <b>
        企业搜索
        <Button
          shape="circle"
          style={{ height: '100%', marginLeft: '3px' }}
          onClick={this.onCancel}
        >
          <Icon type="close" />
        </Button>
      </b>
    );
  };

  render() {
    const { loading, showSearchResult, searchResult, recommendedResult } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Input
            prefix={<Icon type="search" />}
            style={{ width: '60%' }}
            onChange={this.onChange}
            onPressEnter={this.onSearch}
          />
          <Button style={{ marginLeft: '5px' }} onClick={this.onSearch}>
            企业搜索
          </Button>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <Table
            title={() => this.getTableTitle(showSearchResult)}
            loading={loading}
            columns={ChooseEnt.columns}
            rowKey="name"
            dataSource={showSearchResult ? searchResult : recommendedResult}
          />
        </div>
      </div>
    );
  }
}

export default ChooseEnt;
