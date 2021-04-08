import React from 'react'
import './Label.css'

const label = (props) => (
  <label className={'Label'} htmlFor={props.label}>
    {props.children}
  </label>
)

export default label
