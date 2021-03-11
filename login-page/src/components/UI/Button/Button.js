import React, {useState} from 'react'
import classes from './Button.module.css'

const Button = (props) => {

    const [buttonClass, setButtonClass] = useState(classes.Button)

    const onHoverHandler = () => {
        if (!props.isDisabled) setButtonClass([classes.Button,classes['MouseOver']].join(' '))
    }

    const onHoverExitHander = () => {
        if (!props.isDisabled) setButtonClass([classes.Button,classes['MouseExit']].join(' '))
    }
    
    return (
        <button
            className={buttonClass} disabled={props.isDisabled} onMouseEnter={onHoverHandler} onMouseLeave={onHoverExitHander} onClick={(event) => props.onClick(event)}>
            {props.children}
        </button>
    )
};

export default Button;