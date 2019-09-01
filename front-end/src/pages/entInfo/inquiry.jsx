import React, { Component } from 'react';
import { Input, Button, Table, Icon } from 'antd';
import { getRecommendedEnterprises } from '@/services/entInfo';


class EntInfoInquiry extends Component {

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
    const asyncRes = getRecommendedEnterprises();
    this.setState({ loading: true });
    const results = await asyncRes;
    console.log(results);
    this.setState({ loading: false, recommendedResult: results });
  }

  static columns = [
    { title: '企业名称', dataIndex: 'name' },
    { title: '企业地址', dataIndex: 'address' },
    { title: '企业官网', dataIndex: 'website' },
    { title: '联系方式', dataIndex: 'contact' },
  ];

  onChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onSearch = () => {
    alert('[TODO]search!:' + this.state.searchInput);
    // TODO: get & set search result
    this.setState({ showSearchResult: true });
  };

  onCancel = () => {
    this.setState({ showSearchResult: false });
  };

  render() {
    const { loading, showSearchResult, searchResult, recommendedResult } = this.state;
    return <div>
      <div style={{ textAlign: 'center' }}>
        <Input prefix={<Icon type='search'/>} style={{ width: '60%' }}
               onChange={this.onChange} onPressEnter={this.onSearch}/>
        <Button style={{ marginLeft: '5px' }} onClick={this.onSearch}>
          企业搜索
        </Button>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Table title={() => <b>企业推荐</b>} loading={loading}
               columns={EntInfoInquiry.columns} rowKey='name'
               dataSource={showSearchResult? searchResult: recommendedResult} />
      </div>
    </div>
  }
}

export default EntInfoInquiry;
