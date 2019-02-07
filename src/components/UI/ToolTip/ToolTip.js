import React from 'react';

import module from './ToolTip.module.css';

const toolTip = (props) => {
  return (
      <div className={module.tooltip} >
        {props.children}
        <span className={module.tooltiptext} >{props.msg}</span>
      </div>
    )
}

export default toolTip;