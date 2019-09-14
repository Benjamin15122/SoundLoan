import { Button, Col, Form, Input, Popover, Row, Steps, Upload, Icon, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import styles from './style.less';
import Register from './Register';
import {
  askForIdCard,
  comVerify,
  createEntUser,
  finishLegalPersonAuthen,
  legalPersonAuthenByPhone,
} from '@/services/register';
import router from 'umi/router';

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
      currentStep: 0,
      formData: {},
      imgUrl1: '',
      imgUrl2: '',
      id_card: '',
    };
  }

  firstForm = () => {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state;
    const handleNext = e => {
      e.preventDefault();
      form.validateFields(['name', 'password', 'confirm'], (err, values) => {
        if (!err) {
          this.setState({
            currentStep: 1,
            formData: {
              name: values['name'],
              password: values['password'],
            },
          });
        }
      });
    };
    return (
      <Form onSubmit={handleNext}>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入企业名称',
              },
            ],
          })(<Input size="large" placeholder="企业名称" />)}
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
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            下一步
          </Button>
        </FormItem>
      </Form>
    );
  };

  secondForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { formData } = this.state;
    const handleNext = e => {
      e.preventDefault();
      form.validateFields(
        [
          'foundation_date',
          'register_capital',
          'corporate_capital',
          'address',
          'legal_person_name',
        ],
        (err, values) => {
          if (!err) {
            const verifyRes = comVerify({
              name: formData['name'],
              legalPerson: values['legal_person_name'],
              regLocation: values['address'],
              regCapital: values['register_capital'],
            });
            if (verifyRes) {
              this.setState({ currentStep: 2, formData: { ...formData, ...values } });
            }
          }
        },
      );
    };
    return (
      <Form onSubmit={handleNext}>
        <Form.Item>
          {getFieldDecorator('foundation_date', {
            rules: [{ required: true, message: '请输入成立日期' }],
          })(<Input addonBefore="成立日期" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('register_capital', {
            rules: [{ required: true, message: '请输入注册资本' }],
          })(<Input addonBefore="注册资本" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('corporate_capital', {
            rules: [{ required: true, message: '请输入企业资本' }],
          })(<Input addonBefore="企业资本" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: '请输入企业地址' }],
          })(<Input addonBefore="企业地址" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('legal_person_name', {
            rules: [{ required: true, message: '请输入法人名称' }],
          })(<Input addonBefore="法人名称" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            下一步
          </Button>
        </Form.Item>
      </Form>
    );
  };

  finalForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { formData } = this.state;
    const handleSubmit = e => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
        if (!err) {
          const number = values['contact'];
          const code = values['captcha'];
          const ok = await finishLegalPersonAuthen(number, code);
          if (!ok) {
            message.error('验证码不正确');
            return;
          }
          const postData = { ...formData, ...values };
          const regOk = await createEntUser(postData);
          if (!regOk) {
            message.error('注册失败');
            return;
          }
          message.success('注册成功，跳转到登录页面...');
          router.replace('/user/login');
        }
      });
    };
    const beforeUpload = urlProperty => async file => {
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
    const UploadView = urlProperty => (
      <Upload
        listType="picture-card"
        showUploadList={false}
        accept=".jpg"
        beforeUpload={beforeUpload(urlProperty)}
      >
        {this.state[urlProperty] ? (
          <img src={this.state[urlProperty]} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
    const getCaptcha = async e => {
      e.preventDefault();
      const { form } = this.props;
      const { imgUrl1, imgUrl2, formData } = this.state;
      const front_pic = imgUrl1.slice(imgUrl1.indexOf(',') + 1);
      const back_pic = imgUrl2.slice(imgUrl2.indexOf(',') + 1);
      // const result = await askForIdCard(front_pic, back_pic); // url 太大
      const result = await askForIdCard();
      const ok = await legalPersonAuthenByPhone(
        formData['legal_person_name'],
        result.front.code,
        form.getFieldValue('contact'),
      );
      if (ok) {
        message.success('发送验证码成功');
      }
    };
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
          {getFieldDecorator('contact', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(<Input addonBefore="手机号" />)}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(<Input addonBefore="验证码" />)}
            </Col>
            <Col span={8} style={{ paddingLeft: '10px' }}>
              <Button onClick={getCaptcha}>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            注册账户
          </Button>
        </FormItem>
      </Form>
    );
  };

  getStepForm = currentStep => {
    switch (currentStep) {
      case 0:
        return this.firstForm();
      case 1:
        return this.secondForm();
      case 2:
        return this.finalForm();
    }
  };

  render() {
    const { currentStep } = this.state;
    return (
      <div className={styles.main}>
        <Row gutter={8}>
          <Col span={12}>
            <h3>企业用户注册</h3>
          </Col>
          <Col span={12}>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id=".-user-register.register.sign-in" />
            </Link>
          </Col>
        </Row>
        <Steps type="navigation" current={currentStep} style={{ marginBottom: '20px' }}>
          <Steps.Step title="账户信息" />
          <Steps.Step title="企业信息" />
          <Steps.Step title="法人信息" />
        </Steps>
        {this.getStepForm(currentStep)}
      </div>
    );
  }
}

export default Form.create()(RegisterForPerson);
