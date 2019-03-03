import React from 'react';

import module from './Item.module.css';
import { awsS3BucketUrl } from '../../../shared/utility';

const item = (props) => {
  let src = null;
  if(props.src) {
    src = awsS3BucketUrl + props.src;
  }
  return (
    <div className={module.Item} >
      <div className={module.Container} >
        <div className={module.Photo} >
          {/* eslint-disable-next-line */}
          <img src={src} />
        </div>
        <div className={module.InfoContainer} >
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
    </div>
  );
}

export default item;