import React from 'react';

import module from './AddCat.module.css';
import { getInput } from '../../../../shared/utility';
import Button from '../../../UI/FormButton/Button';

const addCat = (props) => {
  let error = null;
  if(props.error) {
    error = (
      <div className={module.Error} >
        {props.error}
      </div>
    );
  }
  return (
    <div className={module.AddCat} >
      <div className={module.Title} >Add New Category</div>
      {error}
      <div className={module.InputBox} >
        <div className={module.Input} >
          {getInput(props.category, props.handler)}
        </div>
      </div>
      <div className={module.Button} >
        <Button width='150px' onClick={props.onClick} >Add Category</Button>
      </div>
    </div>
  );
}

export default addCat;