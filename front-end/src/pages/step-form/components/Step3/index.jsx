import { Button, Result, Descriptions, Statistic, Spin, List, Typography } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
const { Title, Paragraph, Text } = Typography;

const getDescriptionList = (result) => {
  let desArray = []
  for(var i in result){
    desArray.push(<Title level={4}>{`检测结果${i}`}</Title>)
    desArray.push(<Text strong>{result[i][0]}</Text>)
    desArray.push(<Paragraph>{result[i][1]}</Paragraph>)
  }
  return desArray
}

const Step3 = props => {
  const { result, dispatch } = props;

  if (!result) {
    return <Spin/>;
  }

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'stepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const information = (
    <Typography>
      {getDescriptionList(result)}
    </Typography>
  );
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        再检测一次
      </Button>
    </>
  );
  return (
    <Result
      status="success"
      title="检测成功"
      subTitle="检测结果如下"
      extra={extra}
      className={styles.result}
    >
      {information}
    </Result>
  );
};

export default connect(({ stepForm }) => ({
  // data: stepForm.step,
  result: stepForm.result,
}))(Step3);
