import React, { Component } from 'react'
import ChooseProgram from './components/chooseProgram';
import ContractPay from './components/contractPay';
import RatePay from './components/ratePay';
import { thisExpression } from '@babel/types';


export class index extends Component {
    state = {
        step : 1
    }
    
    contractBtn = ()=>{
        const {step} = this.state;
        this.setState({
            step: 2
        });
    }
    
    rateBtn = ()=>{
        const {step} = this.state;
        this.setState({
            step: 3
        });
    }

    render() {
        const {step} = this.state;
        console.log("index");
        switch(step){
            case 1 :
                return (
                    <ChooseProgram 
                        contractBtn={this.contractBtn}
                        rateBtn={this.rateBtn}>
                    </ChooseProgram>
                )
            case 2:
                return <ContractPay></ContractPay>
            case 3:
                return <RatePay></RatePay>
        }
    }
}

export default index