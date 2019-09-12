import React, { Component } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Button } from 'antd';
import center from '@/pages/personalManagement/center';
import { createHashHistory } from 'history';

const history = createHashHistory();

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export class LoanInfo extends Component {
  handleSubmit(e) {
    e.preventDefault();
    //...
    const path = `/enterInfo`;
    console.log('click');
    history.push(path);
  }

  render() {
    return (
      <div>
        <h2>填写信息</h2>
        <div style={{ marginLeft: '15%' }}>
          <Form {...formItemLayout}>
            <Form.Item label="借款金额">
              <InputNumber placeholder="请输入" style={{ width: 'calc(100% - 24px)' }} />
            </Form.Item>

            <Form.Item label="可接受年利率上限" style={{ marginBottom: 0 }}>
              <Form.Item style={{ display: 'inline-block', width: 'calc(100% - 24px)' }}>
                <InputNumber placeholder="请输入" style={{ width: '100%' }} />
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>%</span>
            </Form.Item>

            <Form.Item label="期望还款周期">
              <Select defaultValue="1" style={{ width: 'calc(100% - 24px)' }}>
                <Option value="1">一个月</Option>
                <Option value="2">三个月</Option>
                <Option value="3">半年以上</Option>
              </Select>
            </Form.Item>

            <Form.Item label="借款时间">
              <DatePicker style={{ width: 'calc(100% - 24px)' }} />
            </Form.Item>

            <Form.Item label="联系方式">
              <Input placeholder="请输入" style={{ width: 'calc(100% - 24px)' }} />
            </Form.Item>

            <Form.Item style={{ marginLeft: '36%', textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={this.props.handleSubmit}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoanInfo;
