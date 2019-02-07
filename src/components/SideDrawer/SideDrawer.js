import React from 'react';

import module from './SideDrawer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Auxx/Auxx';
import Nav from '../Shop/Nav/Nav';

const sideDrawer = (props) => {
  let attachedClassses = [module.SideDrawer, module.Close];
  if (props.open) {
    attachedClassses = [module.SideDrawer, module.Open];
  }
  return (
  <Aux>
    <Backdrop show={props.open} onclick={props.closed} />
    <div className={attachedClassses.join(' ')} onClick={props.closed} >
      <Nav isStatic={props.isStatic} />
    </div>
  </Aux>
  );
} 

export default sideDrawer;