import React, { useState } from 'react'
import './Input.css'

const Input = (props) => {
  const InputState = {
    DEFAULT: 'Input',
    SELECTED: 'Input Selected',
    DESELECTED: 'Input Deselected',
  }

  const [inputStyle, setInputStyle] = useState(InputState.DEFAULT)

  const onFocusHandler = () => {
    setInputStyle(InputState.SELECTED)
  }

  const onFocusOutHandler = () => {
    setInputStyle(InputState.DESELECTED)
  }

  return (
    <input
      className={inputStyle}
      onBlur={onFocusOutHandler}
      onFocusCapture={onFocusHandler}
      type={props.type}
      id={props.id}
      name={props.name}
      onChange={(event) => props.onChange(event)}
    >
      {props.children}
    </input>
  )
}

export default Input
