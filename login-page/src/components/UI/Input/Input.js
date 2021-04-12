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

  let inputElement = null

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputStyle}
          {...props.config}
          onBlur={onFocusOutHandler}
          onFocusCapture={onFocusHandler}
          id={props.id}
          name={props.id}
          onChange={props.onChange}
        />
      )
      break
  }

  return (
    <>
      <label className={'Label'} lable={props.label}>
        {props.label}
      </label>
      {inputElement}
    </>
  )
}

export default Input
