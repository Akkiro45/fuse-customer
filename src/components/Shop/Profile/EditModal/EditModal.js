import React from 'react';

import module from './EditModal.module.css';
import Button from '../.././../UI/FormButton/Button';

const editModal = (props) => {
  let error = null;
  if(props.error) {
    error = (
      <div className={module.Error} >
        {props.error}
      </div>
    );
  }
  return (
    <div className={module.EditModal} >
      <div className={module.Title} >Update</div>
      <div>
        {props.inputs}
      </div>
      {error}
      <div className={module.Button} >
        <Button width='150px' onClick={props.onClick} >Update</Button>
      </div>
    </div>
  );
}

export default editModal;