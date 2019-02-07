import React from 'react';
import { NavLink } from 'react-router-dom';

import module from './ButtonLink.module.css';

const buttonLink = (props) => {
  return (
    <div className={module.Container} >
      <NavLink className={module.ButtonLink} to={props.to} exact={props.exact} >
        <div className={module.Link} >
          {props.children}
        </div>
      </NavLink>
    </div>
  );
}

export default buttonLink;