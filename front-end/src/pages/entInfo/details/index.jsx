import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, List, Tabs } from 'antd';

import Introduction from './components/Introduction';
import { getComments, getEntUserInfo, getNews, getChanges, getRelations } from '@/services/entInfo';
import NewsItem from '@/pages/entInfo/details/components/NewsItem';
import CommentItem from '@/pages/entInfo/details/components/CommentItem';
import ChangeItem from '@/pages/entInfo/details/components/ChangeItem';
import RelationItem from '@/pages/entInfo/details/components/RelationItem';

const TabPane = Tabs.TabPane;

class EntInfoDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entUserInfo: {},
      news: [],
      comments: [],
      changes: [],
      relations: [],
    }
  }

  componentDidMount() {
    const { company_name } = this.props.location.query;
    (async () => {
      const entUserInfo = await getEntUserInfo(company_name);
      this.setState({ entUserInfo });
    })();
    (async () => {
      const news = await getNews(company_name);
      this.setState({ news });
    })();
    (async () => {
      const comments = await getComments(company_name);
      this.setState({ comments });
    })();
    (async () => {
      const changes = await getChanges(company_name);
      this.setState({ changes });
    })();
    (async () => {
      const relations = await getRelations(company_name);
      this.setState({ relations });
    })();
  }

  render() {
    const { entUserInfo, news, comments, changes, relations } = this.state;

    return <>
      <PageHeaderWrapper title='企业信息详情'>
        <Card>
          <Introduction descriptions={entUserInfo} />
        </Card>
        <Card>
          <Tabs>
            <TabPane key='news' tab='企业新闻'>
              <List>
                {news.map(({ news_title, news_link, distribution_date }, index) =>
                  <List.Item key={'n' + index}>
                    <NewsItem title={news_title} link={news_link} date={distribution_date}/>
                  </List.Item>)}
              </List>
            </TabPane>
            <TabPane key='change' tab='信息变更'>
              <List>
                {changes.map((changeContent, index) =>
                  <List.Item key={'ch' + index}>
                    <ChangeItem {...changeContent}/>
                  </List.Item>)}
              </List>
            </TabPane>
            <TabPane key='relation' tab='关联关系'>
              <List>
                {relations.map((relationContent, index) =>
                  <List.Item key={'r' + index}>
                    <RelationItem {...relationContent}/>
                  </List.Item>)}
              </List>
            </TabPane>
            <TabPane key='comments' tab='用户评价'>
              <List>
                {comments.map((commentContent, index) =>
                  <List.Item key={'c' + index}>
                    <CommentItem {...commentContent}/>
                  </List.Item>)}
              </List>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    </>
  }
}

export default EntInfoDetails;
