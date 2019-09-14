import React, { Fragment } from 'react';
import { Descriptions, Button, Spin } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';

const getTimestampRandom = () => {
    var outTradeNo = "";
    for (var i = 0; i < 6; i++) {
        outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = new Date().getTime() + outTradeNo;
    return outTradeNo
}

class Pay extends React.Component {
    componentDidMount(){
        const tradeNo = getTimestampRandom()
        this.tradeNo = tradeNo
        const {dispatch} = this.props
        dispatch({
            type: 'stepForm/getPayUrl',
            payload: {
                order_id: tradeNo,
                amount: 0.5
            }
        })
    }

    render() {
        const { payUrl } = this.props
        if(!payUrl){
            return <Spin/>
        }
        return (
            <Fragment>
                <Descriptions column={1}>
                    <Descriptions.Item label="交易码"> {this.tradeNo}</Descriptions.Item>
                    <Descriptions.Item label="应付金额"> {0.5}</Descriptions.Item>
                </Descriptions>
                <Button onClick={()=>{window.location.href = payUrl}}>去支付</Button>
            </Fragment>
        );
    }
};

export default connect(({ stepForm, loading }) => ({
    payUrl: stepForm.payUrl
}))(Pay);
