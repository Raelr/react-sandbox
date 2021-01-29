import React from 'react'
import classes from './Label.module.css'

const label = (props) => (
    <label className={classes.Label} for={props.for}>
        {props.children}
    </label>
);

export default label