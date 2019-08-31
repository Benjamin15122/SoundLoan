import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs, List } from 'antd';

import Introduction from './components/Introduction';
import { getNews } from '@/services/entInfo';
import NewsItem from '@/pages/entInfo/details/components/NewsItem';

const TabPane = Tabs.TabPane;

class EntInfoDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: [],
    }
  }

  getNews = async (company_name) => {
    const news = await getNews(company_name);
    console.debug(news);
    this.setState({ news });
  };

  componentDidMount() {
    this.getNews();
  }

  render() {
    const { news } = this.state;

    return <>
      <PageHeaderWrapper>
        <Card>
          <Introduction />
        </Card>
        <Card>
          <Tabs>
            <TabPane key='news' tab='企业新闻'>
              <List>
              {news.map(({ news_title, news_link, distribution_date }, index) =>
                <List.Item>
                  <NewsItem key={index}
                            title={news_title} link={news_link} date={distribution_date}/>
                </List.Item>)}
              </List>
            </TabPane>
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
