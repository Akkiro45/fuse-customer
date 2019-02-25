import React from 'react';

import module from './RInput.module.css';

const input = (props) => {
  let style = {};
  if(props.fontsize) style.fontSize = props.fontsize;
  if(props.bradius) style.borderRadius = props.bradius;
  return (
    <input 
      className={module.Input}
      type={props.type} 
      placeholder={props.placeholder} 
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required={props.required}
      autoComplete={props.autoComplete}
      style={style}
    />
  );
}

export default input;