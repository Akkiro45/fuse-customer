import React from 'react';

import module from './Nav.module.css';
import NavItem from './NavItem/NavItem';
import Aux from '../../../hoc/Auxx/Auxx';

const nav = (props) => {
  let links = null;
  if(props.isStatic) {
    links = (
      <Aux>
        <NavItem to='/shop/inventory' >Inventory</NavItem>
        <NavItem to='/shop/profile' >Profile</NavItem>
        <NavItem to='/auth/logout' >Logout</NavItem>
      </Aux>
    );
  } else {
    links = (
      <Aux>
        <NavItem to='/shop/orders' >Orders</NavItem>
        <NavItem to='/shop/inventory' >Inventory</NavItem>
        <NavItem to='/shop/profile' >Profile</NavItem>
        <NavItem to='/auth/logout' >Logout</NavItem>
      </Aux>
    );
  }
  return (
      <div className={module.Container} >
          <ul className={module.NavigationItems} >
            <h1>FUSE</h1>
            {links}
          </ul>
      </div>

  );
}

export default nav;
