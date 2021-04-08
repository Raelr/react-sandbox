import React, { useState } from 'react'
import classes from './Input.module.css'

const Input = (props) => {
  const [inputClass, setInputClass] = useState(classes.Input)

  const onFocusHandler = () => {
    setInputClass([classes.Input, classes['Selected']].join(' '))
  }

  const onFocusOutHandler = () => {
    setInputClass([classes.Input, classes['Deselected']].join(' '))
  }

  return (
    <input
      className={inputClass}
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
