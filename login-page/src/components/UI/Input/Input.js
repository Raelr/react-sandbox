import React from 'react'
import classes from './Input.module.css'

const input = (props) => (
    <input className={classes.Input} type={props.type} id={props.id} name={props.name} onChange={(event) => props.onChange(event)}>
        {props.children}
    </input>
);

export default input; 