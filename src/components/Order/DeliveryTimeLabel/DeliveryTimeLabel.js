import React from 'react';

import module from './DeliveryTimeLabel.module.css';
import { dateTimeFormate } from '../../../shared/utility';

const deliveryTimeLabel = (props) => {
  return (
    <div className={module.DeliveryTimeLabel} >
      <div className={module.MainLabel} >
        Estimated Delivery 
      </div>
      <div className={module.Container} >
        <span className={module.Label} >
          From
        </span>
        <span className={module.Time} >
          {dateTimeFormate(props.fromTimeStamp)}
        </span>
      </div>
      <div className={module.Container} >
        <span className={module.Label} >
          To
        </span>
        <span className={module.Time} >
          {dateTimeFormate(props.toTimeStamp)}
        </span>
      </div>
    </div>
  );
}

export default deliveryTimeLabel;