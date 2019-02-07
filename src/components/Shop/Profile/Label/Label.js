import React from 'react';

import module from './Label.module.css';
import EditIcon from '../../../UI/Icons/Edit/Edit';
import Aux from '../../../../hoc/Auxx/Auxx';

const label = (props) => {
  let editIcon = null;
  if(!props.no) 
    editIcon = (
      <Aux>
        <div className={module.Space} ></div>
        <div className={module.Left} >
          <EditIcon onClick={props.onClick} />
        </div>
      </Aux>
    );
  return (
    <div className={module.Label} >
      <div className={module.Left} >
        {props.children}
      </div>
      {editIcon}
    </div>
  );
}

export default label;