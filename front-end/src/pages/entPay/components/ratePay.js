import React, { Component } from 'react';
import { Checkbox, Button, message, InputNumber } from 'antd';

export class RatePay extends Component {

    payConfirm = e => {
        e.preventDefault();
        message.success('您的用户信用评分费用已付清');
        this.props.payConfirm();
    }

    render() {
        return (
            <div style={{marginTop: "5%"}}>
                <h2 style={{textAlign:'center'}}>
                    用户信用评分功能费用
                </h2>
                <div style={flexContainer} style={{flexDirection:"column"}}>
                    <div style={flexContainer}>
                        <div className="leftItem" 
                        style={{margin:"20px",textAlign:"left"}}>
                            <div style={labelItem}>当前有效期至</div>
                            <div style={labelItem}>延长使用服务的时间</div>
                            <div style={labelItem}>单价</div>
                            <div style={labelItem}>共计</div>
                        </div>
                        
                        <div className="rightItem" 
                        style={{margin:"20px",textAlign:"right"}}>
                            <div style={labelItem}>
                                {mockData.year}年
                                {mockData.month}月
                                {mockData.day}日
                            </div>
                            <div style={labelItem}>
                                <InputNumber style={{ width: '30%',marginRight:"10px" }} />月
                            </div>
                            <div style={labelItem}>{mockData.per}元</div>
                            <div style={labelItem}>{mockData.sum}元</div>
                        </div>
                        
                    </div>
                    <div style={flexContainer}>
                        <Checkbox>同意授权给花旗银行进行支付</Checkbox>
                    </div>
                    <div style={flexContainer}>
                    <Button type="primary" 
                        style={btnStyle}
                        onClick={this.payConfirm}>
                        确认付款
                    </Button>

                    </div>
                </div>
            </div>
            
        )
    }
}

const flexContainer = {
    display:"flex",
    justifyContent:"center"
}

const labelItem = {
    margin:"20px",
    fontSize: "18px"
}

const btnStyle = {
    paddingLeft:"20px", 
    paddingRight:"20px",
    margin:"20px", 
    fontSize:"13px",
    textAlign:"center"
}

const mockData = {
    year: 2019,
    month: 9,
    day: 13,
    // proMonth: 2,
    per: 6,
    sum: 120
}

export default RatePay
