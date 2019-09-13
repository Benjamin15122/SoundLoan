import React, { PureComponent } from 'react';
import {
  Descriptions,
  Badge,
  Button,
  Modal,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
} from 'antd';

class CoInfo extends PureComponent {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Descriptions bordered>
          <Descriptions.Item label="企业名称">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="注册资本">Prepaid</Descriptions.Item>
          <Descriptions.Item label="公司资本">YES</Descriptions.Item>
          <Descriptions.Item label="成立日期">2018-04-24 18:00:00</Descriptions.Item>
          <Descriptions.Item label="联系方式" span={2}>
            18612345678
          </Descriptions.Item>
          <Descriptions.Item label="企业官网" span={3}>
            <Badge status="processing" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="贷款利率">$80.00</Descriptions.Item>
          <Descriptions.Item label="企业地址" span={3}>
            $20.00
          </Descriptions.Item>
          <Descriptions.Item label="机构介绍" span={3}>
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication_factor:3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" onClick={this.showModal}>
          修改
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
export default CoInfo;
