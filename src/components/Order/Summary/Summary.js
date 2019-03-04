import React from 'react';

import module from './Summary.module.css';

const summary = (props) => {
  return (
    <div className={module.Summary} >
      <div className={module.Container} >
        <div className={module.Both} >
          <div className={module.Text} >Sub Total</div>
          <div className={module.Price} >Rs. {props.subTotal}</div>
        </div>
        <div className={module.Both} >
          <div className={module.Text} >Delivery Charge</div>
          <div className={module.Price} >Rs. {props.deliveryCharge}</div>
        </div>
        <hr />
        <div className={module.Both} >
          <div className={module.Text} >Total</div>
          <div className={module.Price} >Rs. {props.total}</div>
        </div>
      </div>
    </div>
  );
}

export default summary;