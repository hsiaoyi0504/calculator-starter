import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO
      display: '0',
      number_1: '',
      number_2: '',
      operator: '',
      last_operator: '',
    };
    this.calculate = this.calculate.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  handleNumberClick(children) {
    if (this.state.display === '0') {
      if (this.state.number_1 === '') {
        this.setState({
          number_1: this.state.number_1 + children,
          display: children,
        });
      } else { // this.state.number_1 == 0
        this.setState({
          number_1: children,
          display: children,
        });
      }
    } else if (this.state.operator === '') { // handle number_1 setting
      this.setState({
        display: this.state.number_1 + children,
        number_1: this.state.number_1 + children,
      });
    } else { // this.state.operator!='' handle number_2 setting
      this.setState({
        display: this.state.number_2 + children,
        number_2: this.state.number_2 + children,
      });
    }
  }

  calculate(number1, number2, operator) {
    if (operator === '+') {
      this.setState({
        display: (Number(number1) + Number(number2)).toString(),
        number_1: '',
      });
    } else if (operator === '-') {
      this.setState({
        display: (Number(number1) - Number(number2)).toString(),
        number_1: '',
      });
    } else if (operator === '%') {
      this.setState({
        display: (Number(number1) / Number(number2)).toString(),
        number_1: '',
      });
    } else if (operator === 'x') {
      this.setState({
        display: (Number(number1) * Number(number2)).toString(),
        number_1: '',
      });
    }
  }

  handleOperatorClick(children) {
    if (children === '=') {
      if (this.state.last_operator !== ''){
        this.calculate(this.state.display, this.state.number_2, this.state.last_operator);
      } else {
        this.calculate(this.state.number_1, this.state.number_2, this.state.operator);
      }
      this.setState({
        operator: '',
        last_operator: this.state.operator,
      });
    } else if (this.state.operator !== '' && this.state.number_2 !== '') {
      this.calculate(this.state.number_1, this.state.number_2, this.state.operator);
    } else {
      this.setState({
        operator: children,
      });
    }
  }

  resetState() {
    this.setState({
      last_operator: '',
      display: '0',
      number_1: '',
      number_2: '',
      operator: '',
    });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.handleOperatorClick}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.handleOperatorClick}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.handleNumberClick}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.handleOperatorClick}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number bigger-btn" onClick={this.handleNumberClick}>0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.handleOperatorClick}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
