import React from 'react';

import module from './Select.module.css';

const select = (props) => {
  let options = null;
  let style = {};
  if(props.bradius) style.borderRadius = props.bradius;
  if(props.options) {
    options = props.options.map((option, i) => {
      return <option key={i} value={option.value} >{option.name}</option>
    }); 
  }
  return (
    <select style={style} className={module.Select} value={props.value} name={props.name} onChange={props.onChange} >
      {options}
    </select>
  );
}

export default select;