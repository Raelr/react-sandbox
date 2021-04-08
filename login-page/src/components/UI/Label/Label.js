import React from 'react'
import classes from './Label.module.css'

const label = (props) => (
  <label className={classes.Label} htmlFor={props.label}>
    {props.children}
  </label>
)

export default label
