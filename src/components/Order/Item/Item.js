import React from 'react';

import module from './Item.module.css';

const item = (props) => {
  return (
    <div className={module.Item} >
      <div className={module.Container} >
        <div className={module.Photo} >
          <img src={props.src ? props.src : 'https://www.image.ie/images/no-image.png'} alt={props.name} />
        </div>
        <div className={module.Info} >
          <div className={module.Sub} >
            <div className={module.Name} >{props.name}</div>
            <div className={module.Category} >{props.category}</div>
            <div className={module.Unit} >{props.mUnit} {props.mValue}</div>
            <div className={module.Quntity} >{props.quantity} &#10006; {props.price}</div>
          </div>
        </div>
        <div className={module.Price} >
          <div>Rs. {props.price * props.quantity}</div>
        </div>
      </div>
    </div>
  );
}

export default item;