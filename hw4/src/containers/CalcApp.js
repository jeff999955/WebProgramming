import React from 'react';

import CalcButton from '../components/CalcButton';


/*
 × render button correctly (3 ms)
  × 7 8 9 -> 789
  × 7 8 9 - 8 = -> 781 (1 ms)
  × 7 - 8 -> 8
  × 7 - + 8 -> 15
  × 7 - + 8 - -> 15 (1 ms)
  × 7 8 9 - 8 - -> 781 (1 ms)
  × 4 * 5 = 0 -> 0
  × 1 + 2 = 3 = -> 5
  × AC should clear state
  */

// 計算機 App
class CalcApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statement: "", n_len: 0, reset: false
        };
    }

    resetState = () => {
        this.setState({statement: ""});
    }

    showNotImplemented() {
        console.warn('This function is not implemented yet.');
    }
    appendNumber = event => {
        let ts = this.state.statement;
        if(this.state.reset){
            if(ts.endsWith("+") || ts.endsWith("-") || ts.endsWith("*") || ts.endsWith("/"))
                this.setState({statement: ts + event.target.textContent, n_len: 1, reset: false});
            else 
                this.setState({statement: event.target.textContent, n_len: 1, reset: false});
        }
        else 
            this.setState(state => ({statement: state.statement + event.target.textContent, n_len: state.n_len + 1}))
    }
    appendOperator = event => {
        let ts = this.state.statement;
        if (!ts.length)
            return;
        if(ts.endsWith("+") || ts.endsWith("-") || ts.endsWith("*") || ts.endsWith("/"))
            ts = ts.substr(0, ts.length - 1);
        else
            ts = eval(ts).toString()
        ts += event.target.textContent;
        this.setState(state => ({statement: ts, n_len: 0}))
    }
    parseString = () => {
        const str = this.state.statement;
        const len = this.state.n_len;
        var sstr = "";
        if(str.endsWith("+") || str.endsWith("-") || str.endsWith("*") || str.endsWith("/"))
            sstr = str.substr(0, str.length - 1);
        else 
            sstr = str.substr(str.length - len, len);
        console.log(sstr);
        console.log(`${this.state.statement}, ${this.state.n_len}`);
        return sstr;
    }
    getAnswer = () => {
        let str = this.state.statement;
        if(str.endsWith("+") || str.endsWith("-") || str.endsWith("*") || str.endsWith("/"))
            str += str.substr(0, str.length - 1)
        let ret = eval(str).toString();
        this.setState({statement: ret, n_len: ret.length, reset: true});
            
    }
    render() {
        return (
            <div className="calc-app">
                <div className="calc-container">
                    <div className="calc-output">
                        <div className="calc-display">{this.parseString()}</div>
                    </div>
                    <div className="calc-row">
                        <CalcButton onClick={this.resetState}>AC</CalcButton>
                        <CalcButton onClick={this.parseString}>+/-</CalcButton>
                        <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
                        <CalcButton className="calc-operator" onClick={this.appendOperator}>/</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton className="calc-number" onClick={this.appendNumber}>7</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>8</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>9</CalcButton>
                        <CalcButton className="calc-operator" onClick={this.appendOperator}>*</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton className="calc-number" onClick={this.appendNumber}>4</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>5</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>6</CalcButton>
                        <CalcButton className="calc-operator" onClick={this.appendOperator}>-</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton className="calc-number" onClick={this.appendNumber}>1</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>2</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>3</CalcButton>
                        <CalcButton className="calc-operator" onClick={this.appendOperator}>+</CalcButton>
                    </div>
                    <div className="calc-row">
                        <CalcButton className="calc-number bigger-btn" onClick={this.appendNumber}>0</CalcButton>
                        <CalcButton className="calc-number" onClick={this.appendNumber}>.</CalcButton>
                        <CalcButton className="calc-operator" onClick={this.getAnswer}>=</CalcButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalcApp;
