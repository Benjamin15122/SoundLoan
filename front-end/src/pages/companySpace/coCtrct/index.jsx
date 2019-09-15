import React, { PureComponent } from 'react';
import { Table, Descriptions, Upload, Button, Modal, Radio, message, Input, Icon } from 'antd';
import { Select } from 'antd';
import { getAllContract } from '@/services/enterprise';
import {connect} from 'dva';

const { Option } = Select;


@connect(({user}) => ({user}))
class CoCtrct extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      allContract: [],
      options: CoCtrct.allOptions,
      operatingRecord: undefined,
      showContent: false,
      showSign: false,
      imgUrl: '',
      loading: false,
      signPassword: '',
    }
  }

  columns = [
    {
      title: '合同标题',
      dataIndex: 'contract_title',
    },
    {
      title: '个人名称',
      dataIndex: 'individual_name',
    },
    {
      title: '合同状态',
      dataIndex: 'sign_state',
      render: (text) => {
        switch (text) {
          case 'NoSign':
            return '待签订';
          case 'Individual':
            return '待企业签订';
          case 'Enterprise':
            return '待用户签订';
          case 'BothSign':
            return '签订完成';
        }
      }
    },
    {
      title: '合同内容',
      key: 'contract_content',
      render: (_, record) => (
        <Button onClick={(e) => {
          e.preventDefault();
          this.setState({ showContent: true, operatingRecord: record });
        }}>查看内容</Button>
      )
    },
    {
      title: '合同签订',
      key: 'sign',
      render: (_, record) => {
        if (['NoSign', 'Individual'].indexOf(record['sign_state']) < 0) {
          if (record['sign_state'] !== 'BothSign')
            return <b>--</b>;
          else
            return <Button href='https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=d104de7d-07ad-4700-b7c8-7330f93643cf&scope=internal_domestic_transfers&countryCode=HK&businessCode=GCB&locale=en_HK&state=666&redirect_uri=http://47.103.113.144:8000/companySpace/transferResult'>
              放款
            </Button>
        }
        return <Button onClick={(e) => {
          e.preventDefault();
          this.setState({
            showSign: true,
            operatingRecord: record
          });
        }}>签订</Button>
      }
    }
  ];

  componentDidMount() {
    (async () => {
      const res = await getAllContract(this.props.user.name, 'enterprise');
      this.setState({ allContract: res });
    })();
  }

  static allOptions = ['NoSign', "Individual", "Enterprise", 'BothSign'];

  handleChange = (value) => {
    this.setState({
      options: value === 'all'? CoCtrct.allOptions: [value]
    });
  };

  getContracts = () => {
    const { allContract, options } = this.state;
    return  allContract.filter((value) => options.indexOf(value['sign_state']) >= 0);
  };


  onSign = () => {
    const { operatingRecord, dataUrl } = this.state;
    operatingRecord['sign_state'] = operatingRecord['sign_state'] === 'NoSign' ?
      'Enterprise': 'BothSign';
    console.debug('some thing to do');
    message.success('签订成功');
    this.setState({ showSign: false });
  };

  render() {
    const { showContent, showSign } = this.state;
    const beforeUpload = async file => {
      this.setState({ loading: true });
      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
        this.setState({ imgUrl: dataUrl });
      } catch (err) {
        message.error('上传失败: ' + err.message);
      }
      this.setState({ loading: false });
      return false;
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading? 'loading': 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const SignView = () => {
      {/*<Upload*/
      }
      {/*  listType="picture-card"*/
      }
      {/*  showUploadList={false}*/
      }
      {/*  accept=".jpg"*/
      }
      {/*  beforeUpload={beforeUpload}*/
      }
      {/*>*/
      }
      {/*  {this.state['imgUrl'] ? (*/
      }
      {/*    <img src={this.state['imgUrl']} alt="avatar" style={{ width: '100%' }} />*/
      }
      {/*  ) : (*/
      }
      {/*    uploadButton*/
      }
      {/*  )}*/
      }
      {/*</Upload>*/
      }
      return <Input addonBefore='请输入密码确认'
                    onChange={(value) => this.setState({ signPassword: value })}/>
    };
    return <>
      <div>
        <Select defaultValue="all" style={{ width: 200 }} onChange={this.handleChange}>
          <Option value="all">全部</Option>
          <Option value="NoSign">未签订</Option>
          <Option value="Enterprise">待用户签订</Option>
          <Option value="Individual">待企业签订</Option>
          <Option value="BothSign">签订完成</Option>
        </Select>
        <Table columns={this.columns} dataSource={this.getContracts()} />
      </div>
      <Modal title='查看合同' visible={showContent}
             onCancel={() => this.setState({ showContent: false })}
             onOk={() => this.setState({ showContent: false })}>
        <Descriptions layout='vertical' bordered column={2}>
          <Descriptions.Item label='合同标题'>
            利民贷
          </Descriptions.Item>
          <Descriptions.Item label='个人名称'>
            张全德
          </Descriptions.Item>
          <Descriptions.Item label='合同内容'>
            合同内容...
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Modal title='签订合同' visible={showSign}
             onCancel={() => this.setState({ showSign: false })}
             onOk={this.onSign}>
        {SignView()}
      </Modal>
    </>;
  }
}
export default CoCtrct;
