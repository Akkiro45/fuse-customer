import React from 'react';

import module from './Button.module.css';

const button = (props) => {
  let style = {};
  let className = module.Button;
  if(props.danger) className = module.Danger;
  if(props.width) style.width = props.width;
  if(props.height) style.height = props.height;
  return (
    <button style={style} className={className} onClick={props.onClick} >{props.children}</button>
  );
}

export default button;