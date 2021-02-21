import React from 'react'
import classes from './Button.module.css'

const button = (props) => (
    <button
        className={classes.Button} onClick={(event) => props.onClick(event)}>
        {props.children}
    </button>
)

export default button;