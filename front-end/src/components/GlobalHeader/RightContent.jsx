import { Icon, Popover, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import Calculator from '@/components/Calculator';

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Popover overlayStyle={{  }}
               placement='bottomLeft'
               title='贷款计算器'
               content={
                  <Calculator/>
               }
      >
        <Icon type='calculator' style={{ fontSize: '28px', marginRight: '20px' }} />
      </Popover>
      <Avatar menu />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
