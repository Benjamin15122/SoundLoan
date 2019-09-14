import { Button, Divider, Form, Input, Radio } from 'antd';
import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';

const { Group } = Radio;
const formItemLayout = {
  labelCol: {
    span: 18,
  },
  wrapperCol: {
    span: 6,
  },
};

const Step1 = props => {
  const { form, dispatch, data } = props;

  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields } = form;

  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err && dispatch) {
        dispatch({
          type: 'stepForm/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'stepForm/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };

  return (
    <Fragment>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="企业以“低息、免息、无抵押、无担保、快速房贷”作为宣传">
          {getFieldDecorator('fake_advertising', {
            initialValue: data.fake_advertising,
            rules: [
              {
                required: true,
                message: '请确认情况',
              },
            ],
          })(
            <Group>
              <Radio value="Yes">是</Radio>
              <Radio value="No">否</Radio>
              <Radio value="Unknown">不清楚</Radio>
            </Group>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="合同借款金额和实收金额不同">
          {getFieldDecorator('loan_consistent_with_actual', {
            initialValue: data.loan_consistent_with_actual,
            rules: [
              {
                required: true,
                message: '请确认情况',
              },
            ],
          })(
            <Group>
              <Radio value="Yes">是</Radio>
              <Radio value="No">否</Radio>
              <Radio value="Unknown">不清楚</Radio>
            </Group>,
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
    </Fragment>
  );
};

export default connect(({ stepForm }) => ({
  data: stepForm.step,
}))(Form.create()(Step1));
