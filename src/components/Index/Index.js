import React from 'react';

import module from './Index.module.css';
import BG from '../../assets/Images/Fuse-BG35.png';
import ButtonLink from '../UI/ButtonLink/ButtonLink';

const index = (props) => {
  let style = {
    height: "100%",
    backgroundSize: '360px 375px',
    backgroundImage: `url(${BG})`,  
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
  return (
    <div className={module.Index} >
      <div className={module.Showcase} >
        <div style={style}  >
          <div className={module.Fuse} >
            Fuse
          </div>
          <div className={module.TagLine} >
            Make your shop online!
          </div>
          <div className={module.Links} >
            <div className={module.Left} >
              <ButtonLink to='/auth/signup' >Signup</ButtonLink>
            </div>
            <div className={module.Right} >
              <ButtonLink to='/auth/signin' >Signin</ButtonLink>
            </div>
          </div>
        </div> 
      </div>
      <div className={module.Content} >
        <div className={module.Title} >About Us</div><br />
        <div className={module.Text} >Make your shop online!</div>
      </div>
    </div>
  );
}

export default index;
 