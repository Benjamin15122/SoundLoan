import React, { Component } from 'react';
import LoanInfo from './loanInfo';
import ChooseEnt from './chooseEnt';

export class requireLoan extends Component {
  state = {
    step: 1,
    loanMoney: '',
    acceptedRate: '',
    returnPeriod: '',
    loanDate: '',
    contact: '',
  };

  //submit
  handleSubmit = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  //Handle field changes
  handleChanges = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { loanMoney, acceptedRate, returnPeriod, loanDate, contact } = this.state;
    const values = { loanMoney, acceptedRate, returnPeriod, loanDate, contact };

    switch (step) {
      case 1:
        return <ChooseEnt handleSubmit={this.handleSubmit} />;
      case 2:
        return <h1>Hello</h1>;
    }
  }
}

export default requireLoan;
