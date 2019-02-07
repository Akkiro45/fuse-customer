import React from 'react';

import module from './Header.module.css';
import DrawerToggle from '../../../components/SideDrawer/DrawerToggle/DrawerToggle';

const header = (props) => {
  return (
    <div className={module.Container} >
      <div className={module.ToggleButton} >
        <DrawerToggle clicked={props.openSideDrawerHandler} />
      </div>
      <div className={module.Title} >
        <p>{props.shopName}</p>
      </div>
    </div>
  )
}

export default header;