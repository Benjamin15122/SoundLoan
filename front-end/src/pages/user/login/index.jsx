import { Alert, Checkbox, Icon, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import { getPageQuery } from '@/pages/user/utils/utils';
import SelectUserType from '@/pages/user/components/SelectUserType';
import { entLogin, indLogin } from '@/services/user';
import router from 'umi/router';

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

  handleSubmit = type => async (err, values) => {
    const loginFunc = type === 'person' ? indLogin : entLogin;
    if (!err) {
      const res = await loginFunc(values['userName'], values['password']);
      if (!res.success) {
        message.error('用户名或密码错误！');
        return;
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'user/saveCurrentUser',
        payload: res.content,
      });
      const query = getPageQuery();
      console.log(query.redirect);
      if (query.redirect && query.redirect !== '/') {
        message.success('登录成功，正在重定向...');
        router.replace(query.redirect);
        return;
      }
      message.success('登录成功，跳转到主页...');
      if (type === 'person')
        router.replace('/personalManagement/center');
      else if (type === 'enterprise')
        router.replace('/companySpace/coInfo');
      else
        router.replace('/');
    }
  };

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
    let redirectSuffix = '';
    if (query.redirect)
      redirectSuffix = '&redirect=' + query.redirect;
    if (query.type !== 'person' && query.type !== 'enterprise') {
      return (
        <SelectUserType
          action="登录"
          linkToPerson={"?type=person" + redirectSuffix}
          linkToEnterprise={"?type=enterprise" + redirectSuffix}
        />
      );
    }

    const { userLogin, submitting } = this.props;
    const { status } = userLogin;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey="account"
          onTabChange={() => {}}
          onSubmit={this.handleSubmit(query.type)}
          ref={form => {
            this.loginForm = form;
          }}
        >
          {
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
          }
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
