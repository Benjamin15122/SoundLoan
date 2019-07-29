import { Icon } from 'antd';
import React from 'react';
import styles from './index.less';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

export default {
  UserName: {
    name: 'userName',
    customProps: {
      size: 'large',
      id: 'userName',
      prefix: <Icon type='user' className={styles.prefixIcon} />,
      placeholder: `${formatMessage({
        id: 'user-login.login.userName',
      })}: admin or user`,
    },
    rules: [
      {
        required: true,
        message: formatMessage({
          id: 'user-login.userName.required',
        }),
      },
    ],
  },
  Password: {
    name: 'password',
    customProps: {
      size: 'large',
      prefix: <Icon type='lock' className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: `${formatMessage({
        id: 'user-login.login.password',
      })}: ant.design`,
    },
    rules: [
      {
        required: true,
        message: formatMessage({
          id: 'user-login.password.required',
        }),
      },
    ],
  },
  Mobile: {
    name: 'mobile',
    customProps: {
      size: 'large',
      prefix: <Icon type='mobile' className={styles.prefixIcon} />,
      placeholder: formatMessage({
        id: 'user-login.phone-number.placeholder',
      }),
    },
    rules: [
      {
        required: true,
        message: formatMessage({
          id: 'user-login.phone-number.required',
        }),
      },
      {
        pattern: /^1\d{10}$/,
        message: formatMessage({
          id: 'user-login.phone-number.wrong-format',
        }),
      },
    ],
  },
  Captcha: {
    name: 'captcha',
    customProps: {
      size: 'large',
      prefix: <Icon type='mail' className={styles.prefixIcon} />,
      placeholder: formatMessage({
        id: 'user-login.verification-code.placeholder',
      }),
    },
    rules: [
      {
        required: true,
        message: formatMessage({
          id: 'user-login.verification-code.required',
        }),
      },
    ],
    countDown: 120,
    getCaptchaButtonText: formatMessage({
      id: 'user-login.form.get-captcha',
    }),
    getCaptchaSecondText: formatMessage({
      id: 'user-login.captcha.second',
    }),
  },
};
