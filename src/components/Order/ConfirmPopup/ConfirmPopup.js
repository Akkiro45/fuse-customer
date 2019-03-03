import React from 'react';

import module from './ConfirmPopup.module.css';
import Popup from '../../../hoc/ErrorHandler/ErrorHandler';
import Button from '../../UI/RButton/Button';

const confirmPopup = (props) => {
  let popup = (
    <div className={module.Popup} >
      <div className={module.Msg} >
        {props.msg}
      </div>
      <div className={module.Buttons} >
        <div className={module.Button} >
          <Button onClick={props.onConfirm} >Yes</Button>
        </div>
        <div className={module.Button} >
          <Button onClick={props.popupHandler} >No</Button>
        </div>
      </div>
    </div>
  );
  return (
    <Popup
      error={props.show ? popup : null}
      errorConformedhandler={props.popupHandler}
    />
  );
}

export default confirmPopup;