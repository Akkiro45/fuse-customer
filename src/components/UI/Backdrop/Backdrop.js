import React from 'react';

import module from './Backdrop.module.css';

const backdrop = (props) => {
  return (
    props.show ? <div className={module.Backdrop} onClick={props.onclick}></div> : null
  );
}

export default backdrop;