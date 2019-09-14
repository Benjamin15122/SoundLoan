import React, { PureComponent } from 'react';
import { getEntUserInfo, changeEntUser } from '@/services/enterprise';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import {connect} from 'dva';

@connect(({user}) => ({user}))
class ChangeForm extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      infos:[],
      showModal: false,
      name:null,
      register_capital:null,
      foundation_date:null,
      postData: {},
      visible:false,
    }
  }
  componentDidMount() {
    const {user} = this.props;
    const that = this;
    (async function() {
      const res = await getEntUserInfo(user.name);
      that.setState({ infos: res[0] });
    })();
  }
  
  

  nameChange(e){
    this.setState({
      name:e.target.value
    });
  }
  registerCapitalChange(e){
    this.setState({
      register_capital:e.target.value
    });
  }
  foundationDateChange(e){
    this.setState({
      foundation_date:e.target.value
    });
  }
  websiteChange(e){
    this.setState({
      website:e.target.value
    });
  }
  descriptionChange(e){
    this.setState({
      description:e.target.value
    });
  }
  addressChange(e){
    this.setState({
      address:e.target.value
    });
  }
  
  corporateCapitalChange(e){
    this.setState({
      corporate_capital:e.target.value
    });
  }
  creditScoreChange(e){
    this.setState({
      credit_score:e.target.value
    });
  }
  contactChange(e){
    this.setState({
      contact:e.target.value
    });
  }

  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 18,
        },
        sm: {
          span: 16,
          offset: 18,
        },
      },
    };
    const { infos, showModal } = this.state;
    return(

      <Form {...formItemLayout}>
        <Form.Item label="企业名称">
          <Input placeholder={infos.name} onChange={(event)=>this.nameChange(event)}/ >
        </Form.Item>
        <Form.Item label="注册资本">
          <Input placeholder={infos.register_capital} onChange={(event)=>this.registerCapitalChange(event)}/ >
        </Form.Item>
        <Form.Item label="公司资本">
          <Input placeholder={infos.corporate_capital} onChange={(event)=>this.corporateCapitalChange(event)}/>
        </Form.Item>
        <Form.Item label="成立日期">
          <Input placeholder={infos.foundation_date} onChange={(event)=>this.foundationDateChange(event)}/>
        </Form.Item>
        <Form.Item label="联系方式">
          <Input placeholder={infos.contact} onChange={(event)=>this.contactChange(event)}/>
        </Form.Item>
        <Form.Item label="企业官网">
          <Input placeholder={infos.website} onChange={(event)=>this.websiteChange(event)}/>
        </Form.Item>
        <Form.Item label="贷款利率">
          <Input placeholder={infos.credit_score} onChange={(event)=>this.creditScoreChange(event)}/>
        </Form.Item>
        <Form.Item label="企业地址">
          <Input placeholder={infos.address} onChange={(event)=>this.addressChange(event)}/>
        </Form.Item>
        <Form.Item label="机构介绍">
          <Input placeholder={infos.description} onChange={(event)=>this.descriptionChange(event)}/>
        </Form.Item>
      </Form>
    );
  }
}
export default ChangeForm