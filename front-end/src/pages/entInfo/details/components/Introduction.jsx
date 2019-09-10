import React, { Component } from 'react';
import { Card, Col, Descriptions, Icon, Row } from 'antd';

const DescItem = Descriptions.Item;

const itemLabelList = [
  [ 'name', '企业名称'],
  [ 'foundation_date', '成立日期'],
  [ 'corporate_capital', '公司资本'],
  [ 'register_capital', '注册资本'],
  [ 'legal_person_name', '法人名称'],
  [ 'contact', '联系方式'],
  [ 'website', '企业官网'],
  [ 'address', '企业地址'],
  [ 'description', '企业介绍'],
];

export default class Introduction extends Component {

  static defaultProps = {
    descriptions: {
     'name': '-',
     'foundation_date': '-',
     'corporate_capital': '-',
     'register_capital': '-',
     'legal_person_name': '-',
     'contact': '-',
     'website': '-',
     'address': '-',
      'description': '-',
    }
  };

  render() {
    const {logoUrl, descriptions} = this.props;
    return <>
      <Row>
        <Col span={24}>
          <Descriptions column={2}>
            {itemLabelList.map((itemLabelPair) => {
              return <DescItem key={itemLabelPair[1]} label={itemLabelPair[1]}>
                {descriptions[itemLabelPair[0]]}
              </DescItem>
            })}
          </Descriptions>
        </Col>
      </Row>
    </>
  }
}
