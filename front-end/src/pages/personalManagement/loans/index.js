import React from 'react';
import { Card, Table, Button, Modal, Input } from 'antd';
import { connect } from 'dva';
import styles from './index.css';

const mapStateToProps = state => ({
  loanList: state['personalManagement-loanList']
})

class Loans extends React.Component {
  render() {
    const { loanList } = this.props

    const loanTable = <Table columns={this.columns} dataSource={loanList} />
    const evaluateModal = (
      <Modal
        key={this.state.activeLoanId}
        title="请填写对企业的评价"
        visible={this.state.evaluateModalVisible}
        onOk={_ => this.setState({ evaluateModalVisible: false, activeLoanId: null })}
        onCancel={_ => this.setState({ evaluateModalVisible: false, activeLoanId: null, evaluationText: null })}>
        <Input.TextArea rows={4} onChange={value => this.setState({
          evaluationText: value
        })} />
      </Modal>
    )

    return (
      <Card className={styles.container}>
        {loanTable}
        {evaluateModal}
      </Card>
    );
  }

  state = {
    evaluateModalVisible: false,
    activeLoanId: null,
    evaluationText: null
  }

  columns = [
    { title: '企业名称', key: 'id', render: loan => <span>{loan.client}</span>, },
    { title: '贷款金额', render: loan => <span>{loan.amount}</span>, },
    { title: '申请时间', render: loan => <span>{loan.applyTime}</span>, },
    { title: '申请状态', render: loan => <span>{loan.state}</span>, },
    {
      title: '选项', render: loan => (
        <span>
          <Button disabled={loan.state === "finished"} onClick={_ => this.cancelLoanHandler(loan.id)}>取消</Button>
          <Button onClick={_ => this.setState({
            activeLoanId: loan.id,
            evaluateModalVisible: true
          })}>评价</Button>
        </span>
      )
    }
  ];

  componentDidMount() {
    this.props.dispatch({
      type: "personalManagement-loanList/getLoanList"
    })
  }

  cancelLoanHandler = id => this.props.dispatch({
    type: "personalManagement-loanList/cancelLoan",
    id
  })
}

export default connect(mapStateToProps)(Loans);
