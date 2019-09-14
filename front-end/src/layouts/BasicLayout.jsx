/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.svg';
import router from 'umi/router';

/**
 * use Authorized check all menu item
 */
const menuDataRender = user => menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children? menuDataRender(user)(item.children): [] };
    const authorities = localItem.authority;
    if (!authorities || authorities.indexOf(user.currentUser.authority) >= 0)
      return localItem;
    return undefined;
  });

const footerRender = (_, defaultDom) => {
  if (!isAntDesignPro()) {
    // return defaultDom;
    return (
      <footer style={{ textAlign: 'center', background: 'white' }}>
        <div>本产品暂不向在校学生提供服务</div>
        <div>如有问题，请联系xxxxxxx@xxx.com</div>
        <small>copyright&copy;LoanGuardians</small>
      </footer>
    );
  }

  return (
    <>
      {defaultDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout = props => {
  const { dispatch, children, settings, user, location } = props;
  /**
   * constructor
   */
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || {};
  if (currentUser.name && !user.currentUser.name) {
    dispatch({
      type: 'user/saveCurrentUser',
      payload: currentUser,
    });
  }
  const { pathname, query } = location;
  if (!user.currentUser.name && !currentUser.name) {
    router.replace({
      pathname: '/user/login',
      query: { ...query, redirect: pathname },
    });
  }
  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //     dispatch({
  //       type: 'settings/getSetting',
  //     });
  //   }
  // }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={footerRender}
      menuDataRender={menuDataRender(user)}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  user,
}))(BasicLayout);
