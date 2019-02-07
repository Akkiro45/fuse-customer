import React from 'react';

import module from './SelectLabel.module.css';

const selectLabel = (props) => {
  let style = {
    width: props.width
  }
  return (
    <div style={style} className={module.SelectLabel} >
      {props.value}
    </div>
  );
}

export default selectLabel;