import React, { useState } from 'react'
import './Button.css'

const Button = (props) => {
  const buttonStates = {
    DEFAULT: 'Button',
    MOUSE_OVER: 'Button MouseOver',
    MOUSE_EXIT: 'Button MouseExit',
  }

  const [buttonStyle, setbuttonStyle] = useState(buttonStates.DEFAULT)

  const onHoverHandler = () => {
    if (!props.isDisabled) setbuttonStyle(buttonStates.MOUSE_OVER)
  }

  const onHoverExitHander = () => {
    if (!props.isDisabled) setbuttonStyle(buttonStates.MOUSE_EXIT)
  }

  return (
    <button
      className={buttonStyle}
      disabled={props.isDisabled}
      onMouseEnter={onHoverHandler}
      onMouseLeave={onHoverExitHander}
      onClick={(event) => props.onClick(event)}
    >
      {props.children}
    </button>
  )
}

export default Button
