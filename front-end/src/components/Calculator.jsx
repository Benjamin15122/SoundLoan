import React, { Component } from 'react';
import { Button, Divider, Form, InputNumber, Select } from 'antd';
import { calculate } from '@/services/user';


class Calculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      result: '',
    }
  }

  onReset = e => {
    e.preventDefault();
    this.props.form.setFieldsValue({
      amount: 0, months: 0, rate: 0,
    });
    this.setState({ showResult: false });
  };

  onCalculate = async e => {
    e.preventDefault();
    const { amount, months, rate, type } = this.props.form.getFieldsValue();
    const res = await calculate(amount, rate/100, months, type);
    if (!res) {
      this.setState({ showResult: true, result: '参数错误' });
      return;
    }
    const { total_amount, total_interest, monthly_payment } = res;
    const constructResult = () => <div>
      <div>应还款{total_amount.toFixed(2)}万元（利息{total_interest.toFixed(2)}万元）</div>
      {monthly_payment.map((value, index) => (
        <div key={index}>第{index+1}月应还：{value.toFixed(2)}万元</div>
      ))}
    </div>;
    this.setState({ showResult: true, result: constructResult() })
  };

  render() {
    const { showResult, result } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return <Form style={{ width: '300px' }} labelCol={{ span: '8' }} wrapperCol={{ span: '16' }}>
      <Form.Item label='贷款金额'>
        {getFieldDecorator('amount', {
          initialValue: 1,
        })(
          <InputNumber formatter={value => value + '万'}
                       parser={value => value.slice(0, -1)}
          />
        )}
      </Form.Item>
      <Form.Item label='贷款期限'>
        {getFieldDecorator('months', {
          initialValue: 1,
        })(
          <InputNumber formatter={value => value + '月'}
                       parser={value => value.slice(0, -1)}
          />
        )}
      </Form.Item>
      <Form.Item label='年利率'>
        {getFieldDecorator('rate', {
          initialValue: 1,
        })(
          <InputNumber formatter={value => value + '%'}
                       parser={value => value.slice(0, -1)}
          />
        )}
      </Form.Item>
      <Form.Item label='还款方式'>
        {getFieldDecorator('type', {
          initialValue: 'EqualPricipalInterest',
        })(
          <Select>
            <Select.Option key='EqualPricipalInterest'>
              等额本息
            </Select.Option>
            <Select.Option key='EqualPricipal'>
              等额本金
            </Select.Option>
            <Select.Option key='MonthlyInterest'>
              按月付息，到期还本
            </Select.Option>
            <Select.Option key='QuarterlyInterest'>
              按季付息，到期还本
            </Select.Option>
            <Select.Option key='OneTimeDebt'>
              到期一次性结清
            </Select.Option>
          </Select>
        )}
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={this.onReset}>
          重置
        </Button>
        <Button onClick={this.onCalculate} style={{ marginLeft: '20px' }}>
          计算
        </Button>
      </div>
      {(() => {
        if (showResult)
          return <div>
            <Divider/>
            <div style={{ textAlign: 'center' }}>
              {result}
            </div>
          </div>
      })()}
    </Form>
  }
}

export default Form.create()(Calculator);
