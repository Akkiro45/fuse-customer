import React from 'react';

import module from './LabelIn.module.css';

const labelIn = (props) => {
  let style = {};
  if(props.width) style.width = props.width;
  return (
    <div className={module.LabelIn} style={style} >
      {props.children}
    </div>
  );
} 

export default labelIn;