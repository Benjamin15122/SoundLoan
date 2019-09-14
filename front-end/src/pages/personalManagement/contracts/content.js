import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { Button, Typography, Card } from 'antd';

const mockData = {
  id: '0001',
  content: {
    title: '贷款合同',
    date: '2019-9-12',
    editorContent: {
      blocks: [
        {
          key: '4o5c3',
          text: '甲方：张三',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: '3n5pq',
          text: '乙方：李四',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: '7s7nq',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: 'tgqg',
          text: '贷款金额：￥10,000',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
};

export default class ContractContent extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(mockData.content.editorContent),
  };

  handleChange = editorState => {
    this.setState({ editorState });
  };

  handleSave = _ => {
    console.log(this.state.editorState.toRAW());
  };

  render() {
    return (
      <div>
        <Card
          title={
            <div>
              <Typography.Title level={3}>{mockData.content.title}</Typography.Title>
              <div>签订日期: {mockData.content.date}</div>
            </div>
          }
        >
          <BraftEditor
            value={this.state.editorState}
            onChange={this.handleChange}
            onSave={this.handleSave}
          />
          <Button>合同下载</Button>
        </Card>
      </div>
    );
  }
}
