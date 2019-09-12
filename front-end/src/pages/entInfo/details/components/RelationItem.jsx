import React, { Component } from 'react';

export default class RelationItem extends Component {
  render() {
    const { name, label, properties, type } = this.props;
    return (
      <div>
        <h3>主体名称：{name}</h3>
        <div>主体标签：{label}</div>
        <div>关联标签：{properties}</div>
        <div>关系类型：{type}</div>
      </div>
    );
  }
}
