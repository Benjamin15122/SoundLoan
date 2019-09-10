import React, { Component } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Button } from 'antd';
import center from '@/pages/personalManagement/center';

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

export class index extends Component {
    render() {
        return (
            <div>
                <h2>填写信息</h2>
                  <Form {...formItemLayout}>
                        <Form.Item label="借款金额">
                            <InputNumber placeholder="请输入" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="可接受年利率上限" style={{ marginBottom: 0 }}>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(100% - 24px)' }}>
                                <InputNumber placeholder="请输入" style={{ width: '100%' }} />
                            </Form.Item>
                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>%</span>
                        </Form.Item>

                        <Form.Item label="期望还款周期">
                            <Select defaultValue="1">
                                <Option value="1">一个月</Option>
                                <Option value="2">三个月</Option>
                                <Option value="3">半年以上</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="借款时间">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="联系方式">
                            <Input placeholder="请输入" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0, textAlign: 'center'}}>
                            <Button type="primary" htmlType="submit" >
                                提交
                            </Button>
                        </Form.Item>

                  </Form>
                
            </div>
        )
    }
}

export default index
