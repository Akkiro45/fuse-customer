import React from 'react';

import module from './Orders.module.css';

const orders = (props) => {
  return (
    <div className={module.Order} >   
      <div className={module.Label} >
        {props.label}
      </div>
      <div className={module.Count} >
        {props.count}
      </div>
    </div>
  );
}

export default orders;