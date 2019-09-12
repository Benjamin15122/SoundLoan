import React, { Component } from 'react';

export default class CommentItem extends Component {
  render() {
    const { product_name, comment, score } = this.props;
    return (
      <div>
        <div>
          <b>{product_name}</b>
          <small style={{ marginLeft: '20px' }}>评分：{score}</small>
        </div>
        <div>{comment}</div>
      </div>
    );
  }
}
