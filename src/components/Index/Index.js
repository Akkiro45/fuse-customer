import React from 'react';

import module from './Index.module.css';
import BG from '../../assets/Images/Fuse-BG35.png';
import ButtonLink from '../UI/ButtonLink/ButtonLink';
import ListImg from '../../assets/Images/list.png';
import SubscribeImg from '../../assets/Images/subscribe.png';
import TruckImg from '../../assets/Images/truck.png';
import WebImg from '../../assets/Images/web.png';

const index = (props) => {
  let style = {
    height: "80%",
    backgroundSize: '181px 242px',
    backgroundImage: `url(${BG})`,  
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
  const tacUrl = `${window.location.origin}/auth/tandc`;
  return (
    <div className={module.Index} >
      <div className={module.Showcase} >
        <div style={style}  >
          <div className={module.Fuse} >
            {/* Fuse */}
          </div>
          <div className={module.TagLine} >
            Make your shop online!
          </div>
          <div className={module.Msg} >
            If you want to increase your business, make your business online then you are at right place.
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
        <div className={module.Text} >Fuse let's you create your own shop online.</div>
        <div className={module.Cards} >
          <div className={module.Card} >
            <div className={module.Body} >
              <div className={module.Title1} >
                Join Fuse
              </div>
              <div className={module.Text1} >
                Why to have a physical shop when you can sell online. Just Subscribe at our site and get into the flow. 
              </div>
            </div>
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={SubscribeImg} />
            </div>
          </div>
          <hr className={module.HR} />
          <div className={module.Card} >
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={TruckImg} />
            </div>
            <div className={module.Body} >
              <div className={module.Title1} >
                Easy to take order and delivery
              </div>
              <div className={module.Text1} >
                User will place order on your shop using Fuse then you can 'Accept' the order and complete the delivery. If you are not in condition to fulfill the order 'Reject' the order.
              </div>
            </div>
          </div>
          <hr className={module.HR} />
          <div className={module.Card} >
            <div className={module.Body} >
              <div className={module.Title1} >
                Showcase your product
              </div>
              <div className={module.Text1} >
                Provide all the products you want to sell online and it will be shown to the user who visits your shop. If you cannot provide delivery then you can display your products in order to advertise your shop.
              </div>
            </div>
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={WebImg} />
            </div>
          </div>
          <hr className={module.HR} />
          <div className={module.Card} >
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={ListImg} />
            </div>
            <div className={module.Body} >
              <div className={module.Title1} >
                Easy to manage your shop
              </div>
              <div className={module.Text1} >
                Products can be added or removed from online with few clicks.
              </div>
            </div>
          </div>
        </div>

        <div className={module.Footer} >
          <div className={module.FooterC} >
            <div className={module.LeftC} >
              <div className={module.Label} >
                STAY CONNECTED
              </div>
              <div className={module.Label} >
                Write to us at official@thefuse.in
              </div>
            </div>
            <div className={module.RightC} >
              <div className={module.Label} >
                <a href={tacUrl + '/privacy-policy'} target='_' >Privacy Policy</a>
              </div>
              <div className={module.Label} >
                <a href={tacUrl} target='_' >Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
 