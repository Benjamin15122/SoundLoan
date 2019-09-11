import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';

import Introduction from './components/Introduction';

const TabPane = Tabs.TabPane;

class EntInfoDetails extends Component {

  render() {
    return <>
      <PageHeaderWrapper>
        <Card>
          <Introduction />
        </Card>
        <Card>
          <Tabs>
            <TabPane key='news' tab='企业新闻'/>
            <TabPane key='change' tab='信息变更'/>
            <TabPane key='relation' tab='关联关系'/>
            <TabPane key='comments' tab='用户评价'/>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    </>
  }
}

export default EntInfoDetails;
