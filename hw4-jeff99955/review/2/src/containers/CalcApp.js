import React, { useEffect } from 'react';
import CalcButton from '../components/CalcButton';
import { useState } from 'react';


const CalcApp = () => {
  const [valueShow, setValueShow] = useState('0');
  const [lastIsOp, setLastIsOp] = useState(false);
  const [expression, setExpression] = useState('');

  const resetState = (text) => {
    setValueShow(prevValueShow => '0');
    setLastIsOp(prevLastIsOp => false);
    setExpression(prevExpression => '');
  }

  const postProcessResult = (result) => {
    let resultStr = result.toString();
    if ( resultStr.includes('.') ) {
      const intPart = resultStr.substr(0, resultStr.indexOf('.'));
      if ( intPart.length >= 8 ) {
        resultStr = 'Too Large';
      } else {
        resultStr = resultStr.substr(0, 9);
      }
    } else {
      if ( resultStr.length > 8 ) {
        resultStr = 'Too Large';
      }
    }

    // remove trailing zeros after decimal point
    if ( resultStr.includes('.') ) {
      resultStr = resultStr.replace(/0+$/, "")
      if ( resultStr[resultStr.length - 1] === '.' ) {
        resultStr = resultStr.substr(0, resultStr.length - 1);
      }
    }
    return resultStr;
  }

  const handleEvalError = (e) => {
    console.log(e);
    setValueShow(prevValueShow => 'Error');
    setExpression(prevExpression => '');
    setLastIsOp(prevLastIsOp => false);
  }

  const evaluate = (op) => {
    let completedExpression;
    let result;

    if (expression === '' || 
        valueShow === '-' || 
        valueShow === 'Error' || 
        valueShow === 'Too Large' ||
        valueShow === 'Infinity') {
      return;
    } 
    
    if (lastIsOp) {
      try {
        completedExpression = expression.substring(0, expression.length - 1);
        completedExpression = completedExpression.replace('--', '+');
        result = eval(completedExpression);
        setValueShow(prevValueShow => postProcessResult(result));
        setExpression(prevExpression => '');
        setLastIsOp(prevLastIsOp => false);
      } catch (e) {
        handleEvalError(e);
      }
    } else {
      try {
        completedExpression = expression + valueShow;
        completedExpression = completedExpression.replace('--', '+');
        result = eval(completedExpression);
        setValueShow(prevValueShow => postProcessResult(result));
        setExpression(prevExpression => '');
      } catch (e) {
        handleEvalError(e);
      }
    }
  }

  const handlePlusMinus = (op) => {
    if (valueShow === 'Error' || 
        valueShow === 'Too Large' ||
        valueShow === 'Infinity') {
          return;
    }

    if (valueShow === '-') {
      setValueShow(prevValueShow => '0');
    } else if (valueShow === '0') {
      setValueShow(prevValueShow => '-');
    } else if (valueShow[0] === '-') {
      setValueShow(prevValueShow => prevValueShow.substr(1));
    } else {
      setValueShow(prevValueShow => '-' + prevValueShow);
    }
  }

  const handlePercent = (op) => {
    if (valueShow === '0' ||
        valueShow === '-' || 
        valueShow === 'Error' || 
        valueShow === 'Too Large' ||
        valueShow === 'Infinity')  {
      return;
    }

    let valueShowPercent = (0.01 * parseFloat(valueShow)).toString();
    if ( valueShowPercent.includes('e') ) {
      valueShowPercent = parseFloat(valueShowPercent).toFixed(9);
    }
    valueShowPercent = valueShowPercent.substr(0, 9);
    // remove trailing zeros after decimal point
    valueShowPercent = valueShowPercent.replace(/0+$/, "")
    if ( valueShowPercent[valueShowPercent.length - 1] === '.' ) {
      valueShowPercent = '0';
    }

    setValueShow(prevValueShow => valueShowPercent);
  }

  const handleOpPress = (op) => {
    if (valueShow === '-' || 
        valueShow === 'Error' || 
        valueShow === 'Too Large' ||
        valueShow === 'Infinity')  {
      return;
    }

    if (op === '-') {
      if (lastIsOp || valueShow === '0') {
        setValueShow(prevValueShow => '-');
        setLastIsOp(prevLastIsOp => false);
      } else {
        setExpression(prevExpression => prevExpression + valueShow + '-');
        setLastIsOp(prevLastIsOp => true);
      }
    } else if (op === '+') {
      if (lastIsOp) {
        setExpression(prevExpression => prevExpression.substr(0, prevExpression.length - 1) + '+');
      } else {
        setExpression(prevExpression => prevExpression + valueShow + '+');
        setLastIsOp(prevLastIsOp => true);
      }
    } else if (op === '×') {
      if (lastIsOp) {
        setExpression(prevExpression => prevExpression.substr(0, prevExpression.length - 1) + '*');
      } else {
        setExpression(prevExpression => prevExpression + valueShow + '*');
        setLastIsOp(prevLastIsOp => true);
      }
    } else { // op is "÷"
      if (lastIsOp) {
        setExpression(prevExpression => prevExpression.substr(0, prevExpression.length - 1) + '/');
      } else {
        setExpression(prevExpression => prevExpression + valueShow + '/');
        setLastIsOp(prevLastIsOp => true);
      }
    }
  }

  const handleDigitPress = (digit) => {
    // limit the input length
    if ( !lastIsOp && 
         ( ( !(valueShow.includes('.')) && valueShow.length >= 8 ) ||
           ( valueShow.includes('.') && valueShow.length >= 9) ) ) {
      return;
    }

    if (digit === '.' && !(valueShow.includes('.')) && !(lastIsOp)) {
      setValueShow(prevValueShow => prevValueShow + digit);
    } else if (valueShow === '0' || lastIsOp) {
      setValueShow(prevValueShow => digit);
      setLastIsOp(prevLastIsOp => false);
    } else if (digit !== '.') {
      setValueShow(prevValueShow => prevValueShow + digit);
    }
  }

  return (
    <div className="calc-app">
      <div className="calc-container">
        <div className="calc-output">
          <div className="calc-display">{valueShow}</div>
        </div>
        <div className="calc-row">
          <CalcButton text="AC" onPress={resetState}/> 
          <CalcButton text="±" onPress={handlePlusMinus}/>
          <CalcButton text="%" onPress={handlePercent}/>
          <CalcButton className="calc-operator" onPress={handleOpPress} text="÷" />
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number" onPress={handleDigitPress} text="7" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="8" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="9" />
          <CalcButton className="calc-operator" onPress={handleOpPress} text="×" />
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number" onPress={handleDigitPress} text="4" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="5" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="6" />
          <CalcButton className="calc-operator" onPress={handleOpPress} text="-" />
        </div>
        <div className="calc-row">
          <CalcButton className="calc-number" onPress={handleDigitPress} text="1" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="2" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="3" />
          <CalcButton className="calc-operator" onPress={handleOpPress} text="+" />
        </div>          
        <div className="calc-row">
          <CalcButton className="bigger-btn calc-number" onPress={handleDigitPress} text="0" />
          <CalcButton className="calc-number" onPress={handleDigitPress} text="." />
          <CalcButton className="calc-operator" onPress={evaluate} text="=" />
        </div>
      </div>
    </div>
  );
}

export default CalcApp;
