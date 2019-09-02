import React from 'react';
import { Card, Tabs, Descriptions } from 'antd';
import styles from './index.css';

const { TabPane } = Tabs;

const fakeInfo = {
  姓名: '范迪克',
  性别: '男',
  年龄: '28',
  婚姻状况: '已婚',
  教育水平: '母鸡',
  毕业院校: '利物浦',
  职业: '中后卫',
  工作年限: '8',
  月收入: '25w',
  房产: '很多',
  房贷: '无',
  车产: '很多很多',
  车贷: '无',
  家庭地址: '默西塞德郡',
  工作地址: '利物浦',
};

const fakeCredit = {
  通过审核数: '0',
  还清次数: '0',
  逾期次数: '0',
  严重逾期次数: '0',
  逾期金额: '0',
  其他债务: '0',
  已还本金: '0',
  未还本金: '0',
  已还利息: '0',
  未还利息: '0',
  个人信用分: '0',
};

class Center extends React.Component {
  render() {
    const basicInfoTab = (
      <TabPane tab="基本信息" key="basicInfo">
        <Descriptions
          title={<img className={styles.avatir} src={require('@/assets/vdd.png')} />}
          bordered
        >
          {Object.getOwnPropertyNames(fakeInfo).map(property => (
            <Descriptions.Item label={property} key={property}>
              {fakeInfo[property]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </TabPane>
    );

    const creditInfoTab = (
      <TabPane tab="信用信息" key="creditInfo">
        <Descriptions title={null} bordered>
          {Object.getOwnPropertyNames(fakeCredit).map(property => (
            <Descriptions.Item label={property} key={property}>
              {fakeCredit[property]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </TabPane>
    );

    return (
      <Card className={styles.container}>
        <Tabs
          activeKey={this.state.tabsActiveKeys}
          onTabClick={key => this.setState({ tabsActiveKeys: key })}
        >
          {basicInfoTab}
          {creditInfoTab}
        </Tabs>
      </Card>
    );
  }

  state = {
    tabsActiveKeys: 'basicInfo',
  };
}

export default Center;
