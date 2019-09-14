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
    }
  }

  columns = [
    {
      title: '合同标题',
      dataIndex: 'contract_title',
    },
    {
      title: '企业名称',
      dataIndex: 'enterprise_name',
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
        if (['NoSign', 'Enterprise'].indexOf(record['sign_state']) < 0)
          return <b>--</b>;
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
      'Individual': 'BothSign';
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
    const UploadView = () => (
      <Upload
        listType="picture-card"
        showUploadList={false}
        accept=".jpg"
        beforeUpload={beforeUpload}
      >
        {this.state['imgUrl'] ? (
          <img src={this.state['imgUrl']} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
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
            这个标题
          </Descriptions.Item>
          <Descriptions.Item label='个人名称'>
            某人名称
          </Descriptions.Item>
          <Descriptions.Item label='合同内容'>
            这是...合同..的...内容..
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Modal title='签订合同' visible={showSign}
             onCancel={() => this.setState({ showSign: false })}
             onOk={this.onSign}>
        {UploadView()}
      </Modal>
    </>;
  }
}
export default CoCtrct;
