import React, { PureComponent } from 'react';
import { Table, Descriptions, Upload, Button, Modal, Radio, message, Input, Icon, Card, Dropdown, Menu } from 'antd';
import { Select } from 'antd';
// import { getAllContract } from '@/services/enterprise';
import { connect } from 'dva';
import { Record } from 'immutable';
import styles from './index.css'

const { Option } = Select;

const mapStateToProps = state => ({
  user: state.user,
  contractList: state['personalManagement-contractList'],
  contractDetectReport: state['personalManagement-contractDetectReport'],
  contractContent: state['personalManagement-contractContent']
})

const signStateParser = {
  "NoSign": "待签订",
  "Individual": "待企业签订",
  "Enterprise": "待用户签订",
  "BothSign": "已签订",
}
// class CoCtrct extends PureComponent {

//   state = {
//     allContract: [],
//     options: CoCtrct.allOptions,
//     operatingRecord: undefined,
//     showContent: false,
//     showSign: false,
//     imgUrl: '',
//     loading: false,
//   }

//   columns = [
//     {
//       title: '合同标题',
//       dataIndex: 'contract_title',
//     },
//     {
//       title: '企业名称',
//       dataIndex: 'enterprise_name',
//     },
//     {
//       title: '合同状态',
//       dataIndex: 'sign_state',
//       render: (text) => {
//         switch (text) {
//           case 'NoSign':
//             return '待签订';
//           case 'Individual':
//             return '待企业签订';
//           case 'Enterprise':
//             return '待用户签订';
//           case 'BothSign':
//             return '签订完成';
//         }
//       }
//     },
//     {
//       title: '合同内容',
//       key: 'contract_contract',
//       render: (_, record) => (
//         <Button onClick={(e) => {
//           e.preventDefault();
//           this.setState({ showContent: true, operatingRecord: record });
//         }}>查看内容</Button>
//       )
//     },
//     {
//       title: '合同签订',
//       key: 'sign',
//       render: (_, record) => {
//         if (['NoSign', 'Enterprise'].indexOf(record['sign_state']) < 0)
//           return <b>--</b>;
//         return <Button onClick={(e) => {
//           e.preventDefault();
//           this.setState({
//             showSign: true,
//             operatingRecord: record
//           });
//         }}>签订</Button>
//       }
//     }
//   ];

//   componentDidMount() {
//     (async () => {
//       const res = await getAllContract(this.props.user.name, 'enterprise');
//       this.setState({ allContract: res });
//     })();
//     // this.props.dispatch({
//     //   type:"personalManagement-contractList/getContractList",
//     //   user_name: "Lucy"
//     // })
//   }

//   static allOptions = ['NoSign', "Individual", "Enterprise", 'BothSign'];

//   handleChange = (value) => {
//     this.setState({
//       options: value === 'all' ? CoCtrct.allOptions : [value]
//     });
//   };

//   getContracts = () => {
//     const { allContract, options } = this.state;
//     return allContract.filter((value) => options.indexOf(value['sign_state']) >= 0);
//   };


//   onSign = () => {
//     const { operatingRecord, dataUrl } = this.state;
//     operatingRecord['sign_state'] = operatingRecord['sign_state'] === 'NoSign' ?
//       'Individual' : 'BothSign';
//     console.debug('some thing to do');
//     message.success('签订成功');
//     this.setState({ showSign: false });
//   };

//   render() {
//     const { showContent, showSign } = this.state;
//     const beforeUpload = async file => {
//       this.setState({ loading: true });
//       try {
//         const dataUrl = await new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = () => resolve(reader.result);
//           reader.onerror = error => reject(error);
//         });
//         this.setState({ imgUrl: dataUrl });
//       } catch (err) {
//         message.error('上传失败: ' + err.message);
//       }
//       this.setState({ loading: false });
//       return false;
//     };
//     const uploadButton = (
//       <div>
//         <Icon type={this.state.loading ? 'loading' : 'plus'} />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     const UploadView = () => (
//       <Upload
//         listType="picture-card"
//         showUploadList={false}
//         accept=".jpg"
//         beforeUpload={beforeUpload}
//       >
//         {this.state['imgUrl'] ? (
//           <img src={this.state['imgUrl']} alt="avatar" style={{ width: '100%' }} />
//         ) : (
//             uploadButton
//           )}
//       </Upload>
//     );
//     return <>
//       <div>
//         <Select defaultValue="all" style={{ width: 200 }} onChange={this.handleChange}>
//           <Option value="all">全部</Option>
//           <Option value="NoSign">未签订</Option>
//           <Option value="Enterprise">待用户签订</Option>
//           <Option value="Individual">待企业签订</Option>
//           <Option value="BothSign">签订完成</Option>
//         </Select>
//         <Table columns={this.columns} dataSource={this.getContracts()} />
//       </div>
//       <Modal title='查看合同' visible={showContent}
//         onCancel={() => this.setState({ showContent: false })}
//         onOk={() => this.setState({ showContent: false })}>
//         <Descriptions layout='vertical' bordered column={2}>
//           <Descriptions.Item label='合同标题'>
//             这个标题
//           </Descriptions.Item>
//           <Descriptions.Item label='个人名称'>
//             某人名称
//           </Descriptions.Item>
//           <Descriptions.Item label='合同内容'>
//             这是...合同..的...内容..
//           </Descriptions.Item>
//         </Descriptions>
//       </Modal>
//       <Modal title='签订合同' visible={showSign}
//         onCancel={() => this.setState({ showSign: false })}
//         onOk={this.onSign}>
//         {UploadView()}
//       </Modal>
//     </>;
//   }
// }

class Contracts extends React.Component {
  render() {
    const { contractList, contractDetectReport, contractContent } = this.props
    const { contractType } = this.state

    const contractTable = (
      <Table columns={this.columns} dataSource={contractType ? contractList.filter(c => c.analyze_state === contractType) : contractList} rowKey="id" />
    )

    const filterMenu = (
      <Menu>
        {this.contractTypes.map(c => <Menu.Item key={c} onClick={_ => this.setState({ contractType: c })}>{c}</Menu.Item>)}
      </Menu>
    )

    const filterMenuDropDown = (
      <Dropdown overlay={filterMenu}>
        <a className="ant-dropdown-link" >
          选择合同类型 <Icon type="down" />
        </a>
      </Dropdown>
    )

    const passwordInputModal = (
      <Modal
        title="请输入您的密码"
        visible={this.state.passwordInputModalVisible}
        onOk={_ => this.setState({ passwordInputModalVisible: false }, _ => this.checkHandler)}
        onCancel={_ => this.setState({ passwordInputModalVisible: false })}>
        <Input value={this.state.passwordText} onChange={e => this.setState({ passwordText: e.target.value })} />
      </Modal>
    )

    const contractContentModal = (
      <Modal title={contractContent[0] ? contractContent[0] : "无"} visible={this.state.contractContentModalVisible}
        onCancel={_ => this.setState({ contractContentModalVisible: false })}
        onOk={_ => this.setState({ contractContentModalVisible: false })}>
        {contractContent[1] ? contractContent[1] : "无"}
      </Modal>
    )

    const contractDetectReportModal = (
      <Modal title={contractDetectReport[0] ? contractDetectReport[0] : "无"} visible={this.state.contractDetectReportModalVisible}
        onCancel={_ => this.setState({ contractDetectReportModalVisible: false })}
        onOk={_ => this.setState({ contractDetectReportModalVisible: false })}>
        {contractDetectReport[1] ? contractDetectReport[1] : "无"}
      </Modal>
    )

    return (
      <Card>
        {filterMenuDropDown}
        {contractTable}
        {passwordInputModal}
        {contractDetectReportModal}
        {contractContentModal}
      </Card>
    )
  }

  state = {
    contractType: null,
    passwordInputModalVisible: false,
    passwordText: "",
    activeContractId: null,
    contractDetectReportModalVisible: false,
    contractContentModalVisible: false
  }

  columns = [
    { title: "合同标题", render: contract => <span>{contract.title}</span>, key: "id" },
    { title: "企业名称", render: contract => <span>{contract.enterprise_name}</span> },
    { title: "合同状态", render: contract => <span>{signStateParser[contract.sign_state]}</span> },
    {
      title: "检测状态", render: contract => contract.analyze_state === "Yes" ? (
        <span>
          <div className={styles.detailsTitle}>已检测</div>
          <div className={styles.detailsLink} onClick={_ => this.setState({
            contractDetectReportModalVisible: true
          }, _ => this.props.dispatch({
            type: "personalManagement-contractDetectReport/getReport",
            id: contract.id
          }))}>检测详情</div>
        </span>
      ) : (<Button onClick={_ => this.detectHandler(contract.id)}>发起检测</Button>)
    },
    {
      title: "合同详情", render: contract => <span>
        <div className={styles.detailsLink}
          onClick={_ => this.setState({
            contractContentModalVisible: true
          }, _ => this.props.dispatch({
            type: "personalManagement-contractContent/getContent",
            id: contract.id
          }))}>内容查看</div>
        <a className={styles.detailsLink} target="_blank" href={`http://47.103.113.144:7777/contract/download?contract_id=${contract.id}`}>合同下载</a>
      </span>
    },
    {
      title: "合同签订", render: contract => <span>
        {contract.sign_state === "Enterprise" || contract.sign_state === "NoSign" ?
          (<Button className={styles.checkButton} onClick={_ => this.setState({
            passwordText: "",
            passwordInputModalVisible: true,
            activeContractId: contract.id
          })}>签订</Button>) : "您已签订"}
      </span>
    },
  ]

  contractTypes = ["No", "Yes"]

  componentDidMount() {
    this.props.dispatch({
      type: "personalManagement-contractList/getContractList",
      user_name: "Lucy"
    })
  }

  checkHandler = _ => {
    const { activeContractId, passwordText } = this.state

    this.props.dispatch({
      type: "personalManagement-contractList/signContract",
      user_name: "Lucy",
      contract_id: activeContractId,
      user_passwd: passwordText
    })
  }

  detectHandler = id => {
    this.props.dispatch({
      type: "personalManagement-contractList/detectContract",
      nickname: "Lucy",
      contract_id: id,
      loan_consistent_with_actual: "Unknown",
      fake_advertising: "Unknown"
    })
  }
}

export default connect(mapStateToProps)(Contracts);
