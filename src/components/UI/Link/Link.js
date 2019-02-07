import React from 'react';
import { NavLink } from 'react-router-dom';

import module from './Link.module.css';

const link = (props) =>{
  return (
    <NavLink 
      to={props.to} 
      exact={props.exact} 
      className={ props.remove ? module.Link : module.Style }
    >
      {props.children}
    </NavLink>
  );
}

export default link;