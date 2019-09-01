import React, { Component } from 'react';
import { Input, Button, Table, Icon } from 'antd';


class EntInfoInquiry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      enterpriseEntries: [],
    }
  }

  static columns = [
    { title: '企业名称', dataIndex: 'name' },
    { title: ''}
  ];

  onChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onEnter = (e) => {
    alert('search!:' + this.state.searchInput);
  };

  render() {
    const { enterpriseEntries } = this.state;
    return <div>
      <div style={{ textAlign: 'center' }}>
        <Input addonBefore={<Icon type='search'/>} style={{ width: '60%' }}
               onChange={this.onChange} onPressEnter={this.onEnter}/>
        <Button style={{ marginLeft: '5px' }} onClick={this.onEnter}>
          企业搜索
        </Button>
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Table title={() => <b>企业推荐</b>} dataSource={enterpriseEntries} />
      </div>
    </div>
  }
}

export default EntInfoInquiry;
