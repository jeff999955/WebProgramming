import React from 'react';

const CalcButton = (props) => {
  return (
    <button
      className={`calc-btn ${props.className}`}
      onClick={() => {props.onPress(props.text)}}
    >
      {props.text}
    </button>
  )
}

export default CalcButton;
