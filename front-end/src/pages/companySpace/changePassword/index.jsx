import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'dva';
import { changePW } from '@/services/user';


@connect(({ user }) => ({ user }))
class ChangePassword extends PureComponent {

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, user } = this.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        const ok = await changePW({
          user_name: user.name,
          user_type: 'enterprise',
          origin_password: values['origin_password'],
          new_password: values['new_password']
        });
        if (ok) {
          message.success('修改密码成功');
          form.setFieldsValue({
            origin_password: '',
            new_password: '',
            confirm: '',
          })
        }
        else {
          message.error('修改密码失败');
        }
      }
    })
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return <div>
      <Form style={{ textAlign: 'center', width: '500px', margin: 'auto' }}
            onSubmit={this.handleSubmit}>
        <Form.Item>
          <h3>修改密码</h3>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('origin_password', {
            rules: [{ required: true, message: '不能为空' }]
          })(
            <Input.Password addonBefore='原密码' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('new_password', {
            rules: [{ required: true, message: '不能为空' }]
          })(
            <Input.Password addonBefore='新密码' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '不能为空' },
              { validator: (_, value, cb) => cb(
                value && value !== form.getFieldValue('new_password')? '密码不一致': undefined
                ) }
            ]
          })(
            <Input.Password addonBefore='确认新密码' />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            确认提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  }
}
export default Form.create()(ChangePassword);
