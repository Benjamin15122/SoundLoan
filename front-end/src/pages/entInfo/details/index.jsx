import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class EntInfoDetails extends Component {

  render() {
    return <>
      <PageHeaderWrapper>
        <Card>
          企业基本信息
        </Card>
        <Card>
          <Tabs>
            <TabPane tab='企业新闻'/>
            <TabPane tab='信息变更'/>
            <TabPane tab='关联关系'/>
            <TabPane tab='用户评价'/>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    </>
  }
}

export default EntInfoDetails;
