import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'umi';
import { Card, Tabs, Descriptions, Switch, Tooltip } from 'antd';
import styles from './index.css';

import { infoParser, propertyParser } from '@/utils/Perish/generalUtils';
import CustomInput from '@/components/Perish/CustomInput';

const { TabPane } = Tabs;

const mapStateToProps = state => ({
  personalInfo: state['personalManagement-personalInfo'],
});

class Center extends React.Component {
  render() {
    const { id, nickname, basic, credit } = this.state.info;
    const { editMode } = this.state;
    const { location } = this.props;

    const editSwitch = (
      location.pathname.indexOf('companySpace') > 0 ? <div/>:
      <Tooltip title={editMode ? '结束编辑' : '开始编辑'}>
        <Switch
          className={styles.editSwitch}
          checked={editMode}
          onClick={_ => this.setState({ editMode: !editMode })}
        />
      </Tooltip>
    );

    const basicInfoTab = (
      <TabPane tab="基本信息" key="basicInfo">
        <Descriptions
          // title={<img className={styles.avatir} src={require('@/assets/vdd.png')} />}
          bordered
        >
          {Object.getOwnPropertyNames(basic).map(property => (
            <Descriptions.Item label={property} key={property}>
              {editMode ? (
                <CustomInput
                  defaultValue={basic[property]}
                  onChange={value => this.infoChangeHandler(id, propertyParser(property), value)}
                />
              ) : (
                basic[property]
              )}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </TabPane>
    );

    const creditInfoTab = (
      <TabPane tab="信用信息" key="creditInfo">
        <Descriptions title={null} bordered>
          {Object.getOwnPropertyNames(credit).map(property => (
            <Descriptions.Item label={property} key={property}>
              {credit[property]}
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
        {editSwitch}
      </Card>
    );
  }

  state = {
    tabsActiveKeys: 'basicInfo',
    info: { basic: {}, credit: {} },
    editMode: false,
  };

  componentDidMount() {
    const {id} = this.props.location.query;
    this.props.dispatch({
      type: 'personalManagement-personalInfo/getPersonalInfo',
      id: id ? id: 1,
      callback: info => this.setState({ info: infoParser(info) }),
    });
  }

  infoChangeHandler = (id, property, value) => {
    let newInfo = {};
    newInfo[property] = value;
    this.props.dispatch({
      type: 'personalManagement-personalInfo/updatePersonalInfo',
      id,
      newInfo,
    });
  };
}

export default connect(mapStateToProps)(withRouter(Center));
