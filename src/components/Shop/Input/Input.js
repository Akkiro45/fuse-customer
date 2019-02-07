import React from 'react';

import module from './Input.module.css';

const input = (props) => {
  let style = {};
  if(props.width) style.width = props.width;
  if(props.height) style.height = props.height;
  let placeholder = props.placeholder;
  if(props.required) placeholder = props.placeholder + '*';
  return (
    <input
      className={module.Input}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      placeholder={placeholder}
      autoComplete='off'
      name={props.name}
      required={props.required}
      minLength={props.minLength}
      maxLength={props.maxLength}
      style={style}
    />
  );
}

export default input;