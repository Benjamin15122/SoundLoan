import React, { PureComponent } from 'react';
import ChangeForm from './component/ChangeForm';
import { getEntUserInfo, changeEntUser } from '@/services/enterprise';
import {connect} from 'dva';
import {
  Descriptions,
  Badge,
  Button,
  Modal,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
} from 'antd';

@connect(({user}) => ({user}))
class CoInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      infos:[],
      showModal: false,
      visible:false,
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    const {user} = this.props;
    const that = this;
    (async function() {
      const res = await getEntUserInfo(user.name);
      that.setState({ infos: res });
    })();
  }

  render() {
    const { infos, showModal } = this.state;
    return (
      <div>
        <Descriptions bordered>
          <Descriptions.Item label="企业名称">{infos.name}</Descriptions.Item>
          <Descriptions.Item label="注册资本">{infos.register_capital}</Descriptions.Item>
          <Descriptions.Item label="企业法人">{infos.legal_person_name}</Descriptions.Item>
          <Descriptions.Item label="公司资本">{infos.corporate_capital}</Descriptions.Item>
          <Descriptions.Item label="成立日期">{infos.foundation_date}</Descriptions.Item>
          <Descriptions.Item label="联系方式" span={2}>
            {infos.contact}
          </Descriptions.Item>
          <Descriptions.Item label="企业官网" span={3}>
            {infos.website}
          </Descriptions.Item>
          <Descriptions.Item label="贷款利率">
            {infos.fee_to_pay}
          </Descriptions.Item>
          <Descriptions.Item label="企业地址" span={3}>
            {infos.address}
          </Descriptions.Item>
          <Descriptions.Item label="机构介绍" span={3}>
            {infos.description}
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" onClick={this.showModal}>
          修改
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <ChangeForm/>
        </Modal>
      </div>
    );
  }
}
export default CoInfo;
