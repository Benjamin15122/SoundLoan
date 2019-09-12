import React from 'react';
import { connect } from 'dva';
import { Tooltip, Card, Tabs } from 'antd';
import Dropzone from 'react-dropzone';

import styles from './index.css';

const { TabPane } = Tabs;

const mapStateToProps = state => ({});

class ContractDetect extends React.Component {
  render() {
    const uploadTab = (
      <TabPane tab="合同上传" key="upload">
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {this.dropzoneParser}
        </Dropzone>
      </TabPane>
    );

    const resultTab = <TabPane tab="检测结果" key="result"></TabPane>;

    return (
      <Card>
        <Tabs
          activeKey={this.state.activeKey}
          onTabClick={key => this.setState({ activeKey: key })}
        >
          {uploadTab}
          {resultTab}
        </Tabs>
      </Card>
    );
  }

  state = {
    activeKey: 'upload',
  };

  dropzoneParser = ({ getRootProps, getInputProps }) => (
    <Tooltip title="点击选择文件或拖动文件至框内上传">
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.uploadIcon} />
      </div>
    </Tooltip>
  );
}

export default connect(mapStateToProps)(ContractDetect);
