import { message, Progress } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import router from 'umi/router';
import styles from './style.less';
import { formatMessage } from 'umi-plugin-locale';

class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
  };
  interval = undefined;

  passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <FormattedMessage id=".-user-register.strength.strong" />
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <FormattedMessage id=".-user-register.strength.medium" />
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <FormattedMessage id=".-user-register.strength.short" />
      </div>
    ),
  };
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
  };

  onGetCaptcha = () => {
    let count = 59;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { form, dispatch } = this.props;
  //   form.validateFields(
  //     {
  //       force: true,
  //     },
  //     (err, values) => {
  //       if (!err) {
  //         const { prefix } = this.state;
  //         dispatch({
  //           type: 'userRegister/submit',
  //           payload: {
  //             ...values,
  //             prefix
  //           },
  //         });
  //       }
  //     },
  //   );
  // };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
      callback(
        formatMessage({
          id: '.-user-register.password.twice',
        }),
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        help: formatMessage({
          id: '.-user-register.password.required',
        }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });

      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }

      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true,
          });
        }

        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={this.passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  componentDidUpdate() {
    const { userRegister, form } = this.props;
    const account = form.getFieldValue('mail');
    if (userRegister.status === 'ok') {
      message.success('注册成功！');
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default Register;
