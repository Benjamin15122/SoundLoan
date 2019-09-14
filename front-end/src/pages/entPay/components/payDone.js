import React, { Component } from 'react';
import { Icon } from 'antd';

export class PayDone extends Component {
    render() {
        return (
            <div style={flexStyle}>
                <div>
                    <Icon type="check-circle" theme="twoTone" 
                        style={{fontSize:"80px"}}/>
                </div>

                <div style={{marginTop:"20px"}}>
                    该服务费用已还清
                </div>
            </div>
            
        )
    }
}

const flexStyle = {
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    marginTop:"15%"
}

export default PayDone
