import React from 'react';

import module from './Select.module.css';

const select = (props) => {
  let className = null;
  if(props.media) {
    className = module.Select;
  } 
  if(props.type === 1) {
    className = module.Small; 
  }
  if(props.type === 2) {
    className = module.Medium; 
  }
  if(props.type === 3) {
    className = module.Big; 
  }
  let options = null;
  if(props.options) {
    options = props.options.map(option => {
      return <option key={option.value} value={option.value} >{option.name}</option>
    }); 
  }
  return (
    <select disabled={props.disabled} className={className} value={props.value} name={props.name} onChange={props.onChange} >
      {options}
    </select>
  );
}

export default select;