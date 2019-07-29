import { Button, Col, Form, Input, Popover, Row } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './style.less';
import Register from './Register';

const FormItem = Form.Item;

@connect(({ userRegister, loading }) => ({
  userRegister,
  submitting: loading.effects['userRegister/submit'],
}))
class RegisterForPerson extends Register {

  constructor(props) {
    super(props)
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <Row gutter={8}>
          <Col span={18}>
            <h3>个人用户注册</h3>
          </Col>
          <Col span={6}>
            <Link className={styles.alignRight} to='?type=enterprise'>
              企业用户注册
            </Link>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
              ],
            })(
              <Input
                size="large"
                placeholder='用户名'
              />,
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {this.passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FormattedMessage id=".-user-register.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: '.-user-register.password.placeholder',
                  })}
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: '.-user-register.confirm-password.required',
                  }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: '.-user-register.confirm-password.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: '.-user-register.phone-number.required',
                  }),
                },
                {
                  pattern: /^\d{11}$/,
                  message: formatMessage({
                    id: '.-user-register.phone-number.wrong-format',
                  }),
                },
              ],
            })(
              <Input
                size="large"
                style={{
                  width: '100%',
                }}
                placeholder={formatMessage({
                  id: '.-user-register.phone-number.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: '.-user-register.verification-code.required',
                      }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({
                      id: '.-user-register.verification-code.placeholder',
                    })}
                  />,
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({
                      id: '.-user-register.register.get-verification-code',
                    })}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id=".-user-register.register.register" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id=".-user-register.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RegisterForPerson);
