import React from 'react';
import { Card, Table, Button, Modal, Input, Tag, Divider, Tabs } from 'antd';
import { connect } from 'dva';
import styles from './index.css';

import ReactStars from 'react-stars'

const { TabPane } = Tabs

const mapStateToProps = state => ({
  loanList: state['personalManagement-loanList'],
  user: state.user.currentUser,
  tagList: state['personalManagement-tagList']
})

class Loans extends React.Component {
  render() {
    const { loanList, tagList } = this.props

    const { tags } = this.state

    const loan = loanList.find(l => l.id === this.state.activeLoanId)

    const evaluateModal = (
      <Modal
        key={this.state.activeLoanId}
        title="请填写对企业的评价"
        visible={this.state.evaluateModalVisible}
        onOk={_ => this.setState({ evaluateModalVisible: false, activeLoanId: null }, _ => this.evaluateHandler(loan))}
        onCancel={_ => this.setState({ evaluateModalVisible: false, activeLoanId: null })}>
        <ReactStars count={5} size={24} value={this.state.score} onChange={value => this.setState({ score: value })} />
        <Divider />
        <div>
          {Object.
            keys(tagList).
            filter(tag => !this.state.tags[tag]).
            map(tag => <Tag color={tagList[tag]} key={tag} onClick={_ => this.addTagHandler(tag, tagList[tag])}>{tag}</Tag>)}
        </div>
        <Divider />
        <div>
          {Object.
            keys(tags).
            map(tag => <Tag color={tags[tag]} key={"_" + tag} closable={true} onClose={_ => this.delTagHandler(tag)}>{tag}</Tag>)}
        </div>
        <Divider />
        <Input.TextArea rows={4} value={this.state.evaluationText} onChange={e => this.setState({ evaluationText: e.target.value })} />
      </Modal>
    )

    const uploadingLoanTableTab = (
      <TabPane key="uploading_contract" tab="贷款中" >
        <Table columns={this.columns} dataSource={loanList.filter(l => l.order_status === "uploading_contract")} />
      </TabPane>
    )

    const appliedLoanTableTab = (
      <TabPane key="applied" tab="我的申请">
        <Table columns={this.columns} dataSource={loanList.filter(l => l.order_status === "applied")} />
      </TabPane>
    )

    const finishedLoanTableTab = (
      <TabPane key="finished" tab="已完成贷款">
        <Table columns={this.columns} dataSource={loanList.filter(l => l.order_status === "finished")} />
      </TabPane>
    )

    const loanTabs = (
      <Tabs activeKey={this.state.loanTabsActiveKey} onTabClick={key => this.setState({ loanTabsActiveKey: key })}>
        {appliedLoanTableTab}
        {uploadingLoanTableTab}
        {finishedLoanTableTab}
      </Tabs>
    )

    return (
      <Card className={styles.container}>
        {loanTabs}
        {evaluateModal}
      </Card>
    );
  }

  state = {
    evaluateModalVisible: false,
    activeLoanId: null,
    evaluationText: "",
    realLoanList: [],
    tags: {},
    score: 0,
    loanTabsActiveKey: "uploading_contract"
  }

  columns = [
    { title: '企业名称', key: 'id', render: loan => <span>{loan.company_name ? loan.company_name : loan.lender_id}</span>, },
    { title: '贷款金额', render: loan => <span>{loan.loan_money}</span>, },
    { title: '申请状态', render: loan => <span>{loan.order_status}</span>, },
    {
      title: '选项', render: loan => (
        <Button onClick={_ => this.setState({
          activeLoanId: loan.id,
          evaluateModalVisible: true,
          evaluationText: "",
          tags: {},
          score: 0
        })}>评价</Button>
      )
    }
  ];

  componentDidMount() {
    const { user } = this.props
    this.props.dispatch({
      type: "personalManagement-loanList/getRealLoanList",
      user_name: user.name ? "Lucy" : user.name,
    })

    this.props.dispatch({
      type: "personalManagement-tagList/getTagList"
    })
  }

  evaluateHandler = loan => {
    const { user } = this.props
    this.props.dispatch({
      type: "personalManagement-loanList/updateEvaluation",
      user,
      loan,
      evaluation: this.state.evaluationText,
      score: this.state.score
    })
  }

  addTagHandler = (tag, color) => {
    let { tags, evaluationText } = this.state
    tags[tag] = color
    evaluationText = evaluationText + "#" + tag

    this.setState({
      tags,
      evaluationText
    })
  }

  delTagHandler = tag => {
    let { tags, evaluationText } = this.state
    delete tags[tag]
    evaluationText = evaluationText.replace("#" + tag, "")
    this.setState({ tags, evaluationText })
  }
}

export default connect(mapStateToProps)(Loans);
