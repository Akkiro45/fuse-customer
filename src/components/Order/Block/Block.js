import React from 'react';

import module from './Block.module.css';
import Aux from '../../../hoc/Auxx/Auxx';

const block = (props) => {
  let style1 = {
    fontWeight: 'bold'
  }
  let style2 = {
    fontWeight: 'bold'
  }
  if(props.color1 === 'red') {
    style1.color = '#ff0000';
  } else if(props.color1 === 'green') {
    style1.color = '#00d348';
  }
  if(props.color2 === 'red') {
    style2.color = '#ff0000';
  } else if(props.color2 === 'green') {
    style2.color = '#00d348';
  }
  return (
    <Aux>
      <div className={module.InfoContainer} >
        <div className={module.Icon1} >
          <div className={module.Left} >
            <span className={module.Icon} >{props.leftIcon1}</span>
            <span className={module.Text} >{props.leftText1}</span>
          </div>
          <div className={module.Right} > 
            <span className={module.Icon} >{props.rightIcon1}</span>
            <span className={module.Text1} style={style1} >{props.rightText1}</span>
          </div>
        </div>
        <div className={module.Icon2} >
          <div className={module.Left} >
            <span className={module.Icon} >{props.leftIcon2}</span>
            <span className={module.Text} >{props.leftText2}</span>
          </div>
          <div className={module.Right} > 
            <span className={module.Icon} >{props.rightIcon2}</span>
            <span className={module.Text1} style={style2}>{props.rightText2}</span>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default block;