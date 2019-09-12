import React, { Component } from 'react';

export default class ChangeItem extends Component {
  render() {
    const { change_item, change_time, content_before, content_after } = this.props;
    return (
      <div>
        <h3>变更项目：{change_item}</h3>
        <div>
          变更内容：{content_before} → {content_after}
        </div>
        <small>变更时间：{change_time}</small>
      </div>
    );
  }
}
