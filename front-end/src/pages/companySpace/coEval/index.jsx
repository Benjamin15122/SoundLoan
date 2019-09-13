import React, { Component } from 'react';
import { List, Modal, Input, Button, message } from 'antd';
import { addCommentComplain, getEntProductComments } from '@/services/enterprise';
import {connect} from 'dva';


@connect(({user}) => ({user}))
class CoEval extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showModal: false,
      postData: {},
    }
  }

  componentDidMount() {
    const {user} = this.props;
    const that = this;
    (async function() {
      const res = await getEntProductComments(user.name);
      that.setState({ comments: res.concat(res).concat(res) });
    })();
  }

  handleButton = (comment_product_id, comment_user_id) => (e) => {
    e.preventDefault();
    const {user} = this.props;
    this.setState({ postData: {
      ent_id: user.id, comment_product_id, comment_user_id
      }});
    this.setState({ showModal: true });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await addCommentComplain(this.state.postData);
    if (ok) {
      message.success('提交申诉成功');
      this.setState({ showModal: false });
    }
    else {
      message.error('提交申诉失败');
    }
    this.setState({ postData: {}});
  };

  render() {
    const { comments, showModal } = this.state;
    return <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
          },
          pageSize: 5,
        }}
        dataSource={comments}
        renderItem={item => (
          <List.Item extra={<Button type="primary"
                                    onClick={this.handleButton(
                                      item['product_id'], item['user_id']
                                    )}>
            申诉
          </Button>}>
            <List.Item.Meta
              title={item['user_name']} description={item['product_name']}
            />
            {item['comment']}
          </List.Item>
        )}
      />
      <Modal title='请填写申诉内容' visible={showModal}
             onCancel={() => this.setState({ showModal: false, postData: {} })}
             onOk={this.handleSubmit}
      >
        <Input.TextArea rows={4} onChange={value => this.setState({
          postData: { ...this.state.postData, complain_content: value }
        })} />
      </Modal>
    </>;
  }
}

export default CoEval;
