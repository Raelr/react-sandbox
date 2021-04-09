import React from 'react'
import './Link.css'

const link = (props) => (
  <p>
    {props.preLinkText}
    <span className={'Link'} style={{ color: 'blue' }} onClick={props.onClick}>
      {props.linkText}
    </span>
    {props.postLinkText}
  </p>
)

export default link
