import React from 'react';
import CalcButton from '../components/CalcButton';

class CalcApp extends React.Component {
  	constructor(props) {
		super(props);
		this.state = { formula: '' };
	}
	
	answer = 0;
	temp_answer = 0;
	last_operator = '';
	last_operator_index = -1;
	last_number = '';
	last_char = '';


	resetState = () => {
		this.setState({ formula: '' });
		this.answer = 0;
		this.temp_answer = 0;
		this.last_operator = '';
		this.last_operator_index = -1;
		this.last_number = '';
		this.last_char = '';
	}

	inverse = () => {
		if(this.last_number !== ''){
			if(this.last_operator === '-'){
				let formula = this.state.formula;
				formula = formula.substr(0, this.last_operator_index) + '+' + formula.substr(this.last_operator_index+1, formula.length-this.last_operator_index-1);
				this.setState({ formula: formula });;
				this.last_operator = '+';
			}
			else if(this.last_operator === '+'){
				let formula = this.state.formula;
				formula = formula.substr(0, this.last_operator_index) + '-' + formula.substr(this.last_operator_index+1, formula.length-this.last_operator_index-1);
				this.setState({ formula: formula });
				this.last_operator = '-';
			}
			else{
				let formula = this.state.formula;
				if(formula[this.last_operator_index+1] === '-'){
					formula = formula.substr(0, this.last_operator_index+1) + formula.substr(this.last_operator_index+2, formula.length-this.last_operator_index-2);
					this.setState({ formula: formula });
				}
				else{
					formula = formula.substr(0, this.last_operator_index+1) + '-' + formula.substr(this.last_operator_index+1, formula.length-this.last_operator_index-1);
					this.setState({ formula: formula });
				}
			}
		}
	} 
	percentage = () => {
		if(this.state.formula !== '' &&　this.last_char !== '+' && this.last_char !== '-' && this.last_char !== 'x' && this.last_char !== '÷'){
			this.setState({ formula: this.state.formula+'%'});
			this.last_number = (parseFloat(this.last_number)*0.01).toString();
			this.last_char = '%';
		}
	}

	divide = () => {
		if(this.state.formula !== '' &&　this.last_char !== '+' && this.last_char !== '-' && this.last_char !== 'x' && this.last_char !== '÷'){
			this.state.formula += '÷';
			this.setState({ formula: this.state.formula });
			if(this.last_operator === '+'){
				this.temp_answer = parseFloat(this.last_number);
			}
			else if(this.last_operator === '-'){
				this.temp_answer = -1*parseFloat(this.last_number);
			}
			else if(this.last_operator === 'x'){
				this.temp_answer = parseFloat(this.last_number)*this.temp_answer;
			}
			else if(this.last_operator === '÷'){
				this.temp_answer = this.temp_answer/parseFloat(this.last_number);
			}
			else if(this.last_operator === ''){
				this.temp_answer = parseFloat(this.last_number);
			}

			this.last_operator = '÷';
			this.last_operator_index = this.state.formula.length-1;
			this.last_number = '';
			this.last_char = '÷';
		}
	}

	multiply = () => {
		if(this.state.formula !== '' &&　this.last_char !== '+' && this.last_char !== '-' && this.last_char !== 'x' && this.last_char !== '÷'){
			this.state.formula += 'x';
			this.setState({ formula: this.state.formula });
			if(this.last_operator === '+'){
				this.temp_answer = parseFloat(this.last_number);
			}
			else if(this.last_operator === '-'){
				this.temp_answer = -1*parseFloat(this.last_number);
			}
			else if(this.last_operator === 'x'){
				this.temp_answer = parseFloat(this.last_number)*this.temp_answer;
			}
			else if(this.last_operator === '÷'){
				this.temp_answer = this.temp_answer/parseFloat(this.last_number);
			}
			else if(this.last_operator === ''){
				this.temp_answer = parseFloat(this.last_number);
			}

			this.last_operator = 'x';
			this.last_operator_index = this.state.formula.length-1;
			this.last_number = '';
			this.last_char = 'x';
		}
	}

	subtract = () => {
		if(this.state.formula !== '' &&　this.last_char !== '+' && this.last_char !== '-'){
			this.state.formula += '-';
			this.setState({ formula: this.state.formula });
			if(this.last_operator === '+'){
				this.answer += parseFloat(this.last_number);
			}
			else if(this.last_operator === '-'){
				this.answer -= parseFloat(this.last_number);
			}
			else if(this.last_operator === 'x'){
				this.answer += parseFloat(this.last_number)*this.temp_answer;
			}
			else if(this.last_operator === '÷'){
				this.answer += this.temp_answer/parseFloat(this.last_number);
			}
			else if(this.last_operator === ''){
				this.answer = parseFloat(this.last_number);
			}

			this.temp_answer = 0;
			this.last_operator = '-';
			this.last_operator_index = this.state.formula.length-1;
			this.last_number = '';
			this.last_char = '-';			
		}
	}

	add = () => {
		if(this.state.formula !== '' &&　this.last_char !== '+' && this.last_char !== '-' && this.last_char !== 'x' && this.last_char !== '÷'){
			this.state.formula += '+';
			this.setState({ formula: this.state.formula });
			if(this.last_operator === '+'){
				this.answer += parseFloat(this.last_number);
			}
			else if(this.last_operator === '-'){
				this.answer -= parseFloat(this.last_number);
			}
			else if(this.last_operator === 'x'){
				this.answer += parseFloat(this.last_number)*this.temp_answer;
			}
			else if(this.last_operator === '÷'){
				this.answer += this.temp_answer/parseFloat(this.last_number);
			}
			else if(this.last_operator === ''){
				this.answer = parseFloat(this.last_number);
			}

			this.temp_answer = 0;
			this.last_operator = '+';
			this.last_operator_index = this.state.formula.length-1;
			this.last_number = '';
			this.last_char = '+';
		}
	}

	equal = () => {
		if(this.state.formula === '' |　this.last_char === '+' || this.last_char === '-' || this.last_char === 'x' || this.last_char === '÷'){
			return;
		}
		if(this.last_operator === '+'){
			this.answer += parseFloat(this.last_number);
		}
		else if(this.last_operator === '-'){
			this.answer -= parseFloat(this.last_number);
		}
		else if(this.last_operator === 'x'){
			this.answer += parseFloat(this.last_number)*this.temp_answer;
		}
		else if(this.last_operator === '÷'){
			this.answer += this.temp_answer/parseFloat(this.last_number);
		}
		else if(this.last_operator === ''){
			this.answer = parseFloat(this.last_number);
		}
		let answer = this.answer.toFixed(3);
		this.setState({ formula: answer.toString() });
		this.answer = 0;
		this.temp_answer = 0;
		this.last_operator = '';
		this.last_operator_index = -1;
		this.last_number = answer.toString();
		this.last_char = this.last_number[this.last_number.length-1];
	}

	number = event => {
		let num =　event.currentTarget.innerText; 
		this.last_number += num;
		this.setState({ formula: this.state.formula + num });
		this.last_char = num;
	}

	render() {
		return (
		<div className="calc-app">
			<div className="calc-container">
			<div className="calc-output">
				<div className="calc-display">{this.state.formula}</div>
			</div>
			<div className="calc-row">
				<CalcButton onClick={this.resetState}>AC</CalcButton>
				<CalcButton onClick={this.inverse}>+/-</CalcButton>
				<CalcButton onClick={this.percentage}>%</CalcButton>
				<CalcButton className="calc-operator" onClick={this.divide}>÷</CalcButton>
			</div>
			<div className="calc-row">
				<CalcButton className="calc-number" onClick={this.number}>7</CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>8</CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>9</CalcButton>
				<CalcButton className="calc-operator" onClick={this.multiply}>x</CalcButton>
			</div>
			<div className="calc-row">
				<CalcButton className="calc-number" onClick={this.number}>4</CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>5</CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>6</CalcButton>
				<CalcButton className="calc-operator" onClick={this.subtract}>-</CalcButton>
			</div>
			<div className="calc-row">
				<CalcButton className="calc-number" onClick={this.number}>1</CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>2</CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>3</CalcButton>
				<CalcButton className="calc-operator" onClick={this.add}>+</CalcButton>
			</div>
			<div className="calc-row">
				<CalcButton className="calc-number" onClick={this.number}>0</CalcButton>
				<CalcButton className="calc-number"></CalcButton>
				<CalcButton className="calc-number" onClick={this.number}>.</CalcButton>
				<CalcButton className="calc-operator" onClick={this.equal}>=</CalcButton>
			</div>
			</div>
		</div>
		);
	}
}

export default CalcApp;
