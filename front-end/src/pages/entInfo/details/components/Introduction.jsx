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
    logoUrl: '',
    descriptions: {

    }
  };

  render() {
    return <>
      <Row>
        <Col span={20}>
          <Descriptions column={2}>
            {itemLabelList.map((itemLabelPair) => {
              return <DescItem label={itemLabelPair[1]}>{itemLabelPair[0]}</DescItem>
            })}
          </Descriptions>
        </Col>
        <Col span={4}>
          <Card cover={<img alt='logo'
                            src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'/>}
          />
        </Col>
      </Row>
    </>
  }
}
