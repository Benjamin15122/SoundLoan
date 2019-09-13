import React, { Component } from 'react';
import { Icon, Button } from 'antd';


export class ChooseProgram extends Component {

    contractBtn = e => {
        e.preventDefault();
        this.props.contractBtn();
    }

    rateBtn = e => {
        e.preventDefault();
        this.props.rateBtn();
    }

    render() {
        return (
            <div style={{textAlign:'center',marginTop: "5%",}}>
                <h2 style={{textAlign:'center'}}>
                    请选择您要付费的项目
                </h2>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <div style={{flexDirection:'row'}}>
                        <Button type="primary" 
                            icon="file-text" theme="twoTone" 
                            style={btnStyle}
                            onClick={this.contractBtn}></Button>
                        <div>上一年合同签订费用</div>
                    </div>
                    
                    <div style={{flexDirection:'row'}}>
                        <Button type="primary" 
                            icon="snippets" theme="twoTone" 
                            style={btnStyle}
                            onClick={this.rateBtn}></Button>
                        <div>用户信用评分</div>
                    </div>
                </div>
            </div>
            
        )
    }
}

const btnStyle = {
    width: '120px',
    height: '120px',
    fontSize: '40px',
    display:"inline",
    margin: "50px",
    marginTop: "20%",
    marginBottom: "20px",
    border: 'none',
    paddind: '10px 10px',
    borderRadius: '20%',
    cursor: 'pointer'
}

export default ChooseProgram
