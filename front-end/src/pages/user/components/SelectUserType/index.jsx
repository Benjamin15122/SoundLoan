import React, { Component } from 'react';
import style from './style.less';
import { Button, Card, Icon, Row, Col } from 'antd';
import { Link } from 'umi';
import enterpriseSvg from '../../asset/enterprise.svg';
import personSvg from '../../asset/person.svg';

const { Meta } = Card;

export default class SelectUserType extends Component {
  static defaultProps = {
    linkToPerson: '/404',
    linkToEnterprise: '/404',
  };

  render() {
    const { action, linkToPerson, linkToEnterprise } = this.props;

    return (
      <>
        <div className={style.title}>请选择您要{action}的身份</div>
        <div>
          <Row gutter={32} className={style.pane} align="middle" justify="center" type="flex">
            <Col span={4}>
              <Link to={linkToPerson}>
                <Card
                  className={style.card}
                  bordered
                  hoverable
                  cover={<img className={style.img} alt="personal" src={personSvg} />}
                >
                  个人用户
                </Card>
              </Link>
            </Col>
            <Col span={4}>
              <Link to={linkToEnterprise}>
                <Card
                  className={style.card}
                  bordered
                  hoverable
                  cover={<img className={style.img} alt="enterprise" src={enterpriseSvg} />}
                >
                  企业用户
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
