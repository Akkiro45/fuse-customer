import React from 'react';

import module from './Input.module.css';

const input = (props) => {
  let style = {};
  let classes = [module.Input];
  if(props.width) style.width = props.width;
  if(props.height) style.height = props.height;
  if(props.Height) {
    classes.push(module.Height);
  }
  return (
    <input 
      className={classes.join(' ')}
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