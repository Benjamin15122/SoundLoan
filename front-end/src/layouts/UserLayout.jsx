import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/LoanGuard_logo.png';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/user/welcome">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
              <Link to='/user/contractDetect'>
                检测合同
              </Link>
              <Link to='/user/requireLoan'>
                我要借款
              </Link>
              <Link to='/user/inquiry'>
                企业查询
              </Link>
              <Link to='/user/login' style={{ float: 'right' }}>
                现在登录
              </Link>
            </div>
          </div>
          {children}
        </div>
        <footer style={{ textAlign: 'center', background: 'white' }}>
          <div>本产品暂不向在校学生提供服务</div>
          <div>如有问题，请联系xxxxxxx@xxx.com</div>
          <small>copyright&copy;LoanGuardians</small>
        </footer>
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
