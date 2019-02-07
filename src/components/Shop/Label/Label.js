import React from 'react';

import module from './Label.module.css';

const label = (props) => {
  return (
    <div className={module.Label} > 
      {props.children}
    </div>
  );
}

export default label;