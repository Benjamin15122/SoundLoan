import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import { getPageQuery } from '@/pages/user/utils/utils';
import SelectUserType from '@/pages/user/components/SelectUserType';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects['userLogin/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'userLogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const query = getPageQuery();
    let tabPane;
    if (query.type !== 'person' && query.type !== 'enterprise') {
      return (
        <SelectUserType
          action="登录"
          linkToPerson="?type=person"
          linkToEnterprise="?type=enterprise"
        />
      );
    }

    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {query.type === 'person' || query.type === 'enterprise' ? (
            <Tab
              key="account"
              tab={formatMessage({
                id: 'user-login.login.tab-login-credentials',
              })}
            >
              {status === 'error' &&
                !submitting &&
                this.renderMessage(
                  formatMessage({
                    id: 'user-login.login.message-invalid-credentials',
                  }),
                )}
              <UserName />
              <Password />
            </Tab>
          ) : null}
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            {/*<Link to='/user/forgetPassword'>*/}
            {/*  忘记密码*/}
            {/*</Link>*/}
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="user-login.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
