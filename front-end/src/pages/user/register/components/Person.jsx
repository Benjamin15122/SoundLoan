import { Button, Col, Form, Icon, Input, message, Popover, Row, Steps, Upload } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './style.less';
import Register from './Register';
import {

} from '@/services/register';
import router from 'umi/router';
import { askForIdCard } from '@/services/register';
import { legalPersonAuthenByPhone } from '@/services/register';
import { finishLegalPersonAuthen } from '@/services/register';
import { newCreateIndUser } from '@/services/register';

const FormItem = Form.Item;

@connect(({ userRegister, loading }) => ({
  userRegister,
  submitting: loading.effects['userRegister/submit'],
}))
class RegisterForPerson extends Register {

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      formData: {},
      currentStep: 1,
      imgUrl1: '',
      imgUrl2: '',
    }
  }

  firstForm = () => {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state;
    const handleNext = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const { nickname, password } = values;
          this.setState({ currentStep: 1, formData: { nickname, password } });
        }
      })
    };
    return (
      <Form onSubmit={handleNext}>
        <FormItem>
          {getFieldDecorator('nickname', {
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
          <Button
            size="large"
            loading={submitting}
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            下一步
          </Button>
        </FormItem>
      </Form>
    )
  };

  finalForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { formData, count } = this.state;
    const handleSubmit = (e) => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          const ok = await finishLegalPersonAuthen(values['contact'], values['captcha']);
          if (!ok) {
            message.error('验证码不正确');
            return;
          }
          const postData = { ...formData, phone_number: values['contact'] };
          const regOk = await newCreateIndUser(postData);
          if (!regOk) {
            message.error('注册失败');
            return;
          }
          message.success('注册成功, 跳转到登录界面...');
          router.replace('/user/login');
        }
      })
    };
    const getCaptcha = async (e) => {
      e.preventDefault();
      const { form } = this.props;
      const { imgUrl1, imgUrl2 } = this.state;
      const front_pic = imgUrl1.slice(imgUrl1.indexOf(',') + 1);
      const back_pic = imgUrl2.slice(imgUrl2.indexOf(',') + 1);
      const result = await askForIdCard(front_pic, back_pic);
      const ok = await legalPersonAuthenByPhone(
        form.getFieldValue('name'), result.front.code, form.getFieldValue('contact')
      );
      if (ok) {
        message.success('发送验证码成功');
      }
    };
    const beforeUpload = (urlProperty) => async (file) => {
      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
        this.setState({ [urlProperty]: dataUrl });
      } catch (err) {
        message.error('上传失败: ' + err.message);
      }
      return false;
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const UploadView = (urlProperty) => (
      <Upload
        listType="picture-card"
        showUploadList={false}
        accept='.jpg'
        beforeUpload={beforeUpload(urlProperty)}

      >
        {this.state[urlProperty] ?
          <img src={this.state[urlProperty]} alt="avatar" style={{ width: '100%' }} />
          : uploadButton}
      </Upload>
    );
    return (
      <Form onSubmit={handleSubmit}>
        <FormItem>
          <Row>
            <Col span={12}>
              <div>
                <div>身份证正面</div>
                {UploadView('imgUrl1')}
              </div>
            </Col>
            <Col span={12}>
              <div>
                <div>身份证反面</div>
                {UploadView('imgUrl2')}
              </div>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [ { required: true, message: '请输入姓名' }]
          })(
            <Input placeholder='姓名'/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('contact', {
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
                  placeholder={formatMessage({
                    id: '.-user-register.verification-code.placeholder',
                  })}
                />,
              )}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                onClick={getCaptcha}
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
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>注册账户</Button>
        </FormItem>
      </Form>
    )
  };

  getStepForm = (currentStep) => {
    if (currentStep === 0) {
      return this.firstForm();
    } else {
      return this.finalForm();
    }
  };

  render() {
    const { currentStep } = this.state;
    return (
      <div className={styles.main}>
        <Row gutter={8}>
          <Col span={12}>
            <h3>个人用户注册</h3>
          </Col>
          <Col span={12}>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id=".-user-register.register.sign-in" />
            </Link>
          </Col>
        </Row>
        <Steps current={currentStep} style={{ marginBottom: '10px' }}>
          <Steps.Step title='账号信息'/>
          <Steps.Step title='个人认证'/>
        </Steps>
        {this.getStepForm(currentStep)}
      </div>
    );
  }
}

export default Form.create()(RegisterForPerson);
