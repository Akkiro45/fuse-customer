import React from 'react';

import module from './CheckBox.module.css';

const checkbox = (props) => {
  return (
    <input className={module.CheckBox} type='checkbox' checked={props.checked} onChange={props.onChange} />
  )
}

export default checkbox;