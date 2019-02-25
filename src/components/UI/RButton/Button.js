import React from 'react';

import module from './Button.module.css';

const button = (props) => {
  let style = {};
  if(props.bgcolor) style.backgroundColor = props.bgcolor;
  if(props.color) style.color = props.color;
  return (
    <button style={style} className={module.Button} onClick={props.onClick} >{props.children}</button>
  )
}

export default button;