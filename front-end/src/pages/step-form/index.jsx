import { Card, Steps } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Pay from './components/Pay';
import styles from './style.less';

const { Step } = Steps;

@connect(({ stepForm }) => ({
  current: stepForm.current,
  paid: stepForm.paid,
}))
class StepForm extends Component {
  getCurrentStep() {
    const { current } = this.props;

    switch (current) {
      case 'info':
        return 0;

      case 'confirm':
        return 1;

      case 'result':
        return 2;

      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    const {paid} = this.props
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }

    return (
        <Card bordered={false}>
          { paid?<>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="合同简况确认" />
              <Step title="合同内容上传" />
              <Step title="检测结果查询" />
            </Steps>
            {stepComponent}
          </>:<Pay/>}
        </Card>
    );
  }
}

export default StepForm;
