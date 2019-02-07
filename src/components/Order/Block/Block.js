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
    style1.color = 'red';
  } else if(props.color1 === 'green') {
    style1.color = '#27df46';
  }
  if(props.color2 === 'red') {
    style2.color = 'red';
  } else if(props.color2 === 'green') {
    style2.color = '#27df46';
  }
  // if(props.red1) {
  //   style1.color = 'red';
  // }  
  // if(props.green1) {
  //   style1.color = '#27df46';
  // }  
  // if(props.green2) {
  //   style2.color = '#27df46'
  // }  
  // if(props.red2) {
  //   style2.color = 'red';
  // }
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
            <span className={module.Text} style={style1} >{props.rightText1}</span>
          </div>
        </div>
        <div className={module.Icon2} >
          <div className={module.Left} >
            <span className={module.Icon} >{props.leftIcon2}</span>
            <span className={module.Text} >{props.leftText2}</span>
          </div>
          <div className={module.Right} > 
            <span className={module.Icon} >{props.rightIcon2}</span>
            <span className={module.Text} style={style2}>{props.rightText2}</span>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default block;