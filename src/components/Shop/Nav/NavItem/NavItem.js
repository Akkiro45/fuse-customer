import React from 'react';
import { NavLink } from 'react-router-dom';

import module from './NavItem.module.css';

const navItem = (props) => {
  return (
    <li className={module.NavItem} >
      <NavLink 
        activeClassName={module.active} 
        to={props.to} 
        exact={props.exact} 
      >{props.children}</NavLink>
    </li>
  );
}

export default navItem;