import React, { Component } from 'react';
import { Button, Divider, Form, InputNumber } from 'antd';


class Calculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      result: 0,
    }
  }

  onReset = e => {
    e.preventDefault();
    this.props.form.setFieldsValue({
      amount: 0, months: 0, rate: 0,
    });
    this.setState({ showResult: false });
  };

  onCalculate = e => {
    e.preventDefault();
    const { amount, months, rate } = this.props.form.getFieldsValue();
    const res = amount * months / 12 * rate / 1000 + amount;
    this.setState({ showResult: true, result: res })
  };

  render() {
    const { showResult, result } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return <Form style={{ paddingRight: '20px' }} labelCol={{ span: '12' }} wrapperCol={{ span: '12' }}>
      <Form.Item label='贷款金额'>
        {getFieldDecorator('amount', {
          initialValue: 0,
        })(
          <InputNumber formatter={value => value + '万'}
                       parser={value => value.slice(0, -1)}
          />
        )}
      </Form.Item>
      <Form.Item label='贷款期限'>
        {getFieldDecorator('months', {
          initialValue: 0,
        })(
          <InputNumber formatter={value => value + '月'}
                       parser={value => value.slice(0, -1)}
          />
        )}
      </Form.Item>
      <Form.Item label='年利率'>
        {getFieldDecorator('rate', {
          initialValue: 0,
        })(
          <InputNumber formatter={value => value + '‰'}
                       parser={value => value.slice(0, -1)}
          />
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
              应还款项：{result} 万元
            </div>
          </div>
      })()}
    </Form>
  }
}

export default Form.create()(Calculator);
