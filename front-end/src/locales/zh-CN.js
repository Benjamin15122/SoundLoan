import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'menu.个人信息': '个人信息',
  'menu.个人信息.个人空间': '个人空间',
  'menu.个人信息.我的贷款': '我的贷款',
  'menu.个人信息.我的合同': '我的合同',
  'menu.个人信息.账户设置': '账户设置',
  'menu.个人信息.修改密码': '修改密码',
  'menu.企业信息': '企业信息',
  'menu.企业信息.企业详情': '企业详情',
  'menu.合同检测': '合同检测',
  'menu.企业查询': '企业查询',
  'menu.我要借款': '我要借款',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
