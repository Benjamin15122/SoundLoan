import { Alert, Button, Descriptions, Divider, Statistic, Form, Input, Tabs } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const { TextArea } = Input;
const { TabPane } = Tabs;

const yesOrNoTranslate = (en) => {
  switch (en) {
    case 'Yes': return '是';
    case 'No': return '否';
    case 'Unknown': return '不清楚';
    default: return '不清楚';
  }
}

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const { form, data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { getFieldDecorator, validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'stepForm/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'stepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'stepForm/submitStepForm',
            payload: { ...data, ...values },
          });
        }
      }
    });
  };

  const { fake_advertising, loan_consistent_with_actual } = data;

  const contentForm = (<Form layout="horizontal" className={styles.stepForm}>
    <Alert
      closable
      showIcon
      message="合同内容或合同图片选择一个上传即可"
      style={{ marginBottom: 24 }}
    />
    <Descriptions column={1}>
      <Descriptions.Item label="企业以“低息、免息、无抵押、无担保、快速房贷”作为宣传"> {yesOrNoTranslate(fake_advertising)}</Descriptions.Item>
      <Descriptions.Item label="合同借款金额和实收金额不同"> {yesOrNoTranslate(loan_consistent_with_actual)}</Descriptions.Item>
    </Descriptions>
    <Divider
      style={{
        margin: '24px 0',
      }}
    />
    <Form.Item {...formItemLayout} label="合同标题" required={false}>
      {getFieldDecorator('contract_title', {
        rules: [
          {
            required: true,
            message: '请输入合同标题',
          },
        ],
      })(
        <Input />,
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="借贷方" required={false}>
      {getFieldDecorator('individual_name', {
        rules: [
          {
            required: true,
            message: '请输入借贷方用户名',
          },
        ],
      })(
        <Input />,
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="放贷方" required={false}>
      {getFieldDecorator('enterprise_name', {
        rules: [
          {
            required: true,
            message: '请输入放贷方用户名',
          },
        ],
      })(
        <Input />,
      )}
    </Form.Item>
    <Form.Item {...formItemLayout} label="合同内容" required={false}>
      {getFieldDecorator('contract_content', {
        rules: [
          {
            required: true,
            message: '需要合同内容才能进行检测',
          },
        ],
      })(
        <TextArea rows={4} />,
      )}
    </Form.Item>
    <Form.Item
      style={{
        marginBottom: 8,
      }}
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
      <Button type="primary" onClick={onValidateForm} loading={submitting}>
        提交
    </Button>
      <Button
        onClick={onPrev}
        style={{
          marginLeft: 8,
        }}
      >
        上一步
    </Button>
    </Form.Item>
  </Form>)

  const pictureForm = (<Form layout="horizontal" className={styles.stepForm}>
    <Alert
      closable
      showIcon
      message="合同图片或合同内容选择一个上传即可"
      style={{ marginBottom: 24 }}
    />
    <Descriptions column={1}>
      <Descriptions.Item label="企业以“低息、免息、无抵押、无担保、快速房贷”作为宣传"> {yesOrNoTranslate(fake_advertising)}</Descriptions.Item>
      <Descriptions.Item label="合同借款金额和实收金额不同"> {yesOrNoTranslate(loan_consistent_with_actual)}</Descriptions.Item>
    </Descriptions>
    <Divider
      style={{
        margin: '24px 0',
      }}
    />
    <Form.Item {...formItemLayout} label="支付密码" required={false}>
      {getFieldDecorator('password', {
        initialValue: '123456',
        rules: [
          {
            required: true,
            message: '需要支付密码才能进行支付',
          },
        ],
      })(
        <Input
          type="password"
          autoComplete="off"
          style={{
            width: '80%',
          }}
        />,
      )}
    </Form.Item>
    <Form.Item
      style={{
        marginBottom: 8,
      }}
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
      <Button type="primary" onClick={onValidateForm} loading={submitting}>
        提交
  </Button>
      <Button
        onClick={onPrev}
        style={{
          marginLeft: 8,
        }}
      >
        上一步
  </Button>
    </Form.Item>
  </Form>)
  return (
    <Tabs defaultActiveKey="1" tabPosition="top">
      <TabPane tab="上传文字格式" key="1">
        {contentForm}
      </TabPane>
      <TabPane tab="上传图片格式" key="2">
        {pictureForm}
      </TabPane>
    </Tabs>
  );
};

export default connect(({ stepForm, loading }) => ({
  submitting: loading.effects['stepForm/submitStepForm'],
  data: stepForm.step,
}))(Form.create()(Step2));
