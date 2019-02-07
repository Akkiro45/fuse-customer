import React from 'react';

import module from './Item.module.css';

const item = (props) => {
  return (
    <div className={module.Item} onClick={() => props.onClick(props.data)} >
      <div className={module.Photo} >
        {/* eslint-disable-next-line */}
        <img src={props.src ? props.src : 'https://www.image.ie/images/no-image.png'} className={module.Img} />
      </div>
      <div className={module.Name} >
        {props.name}
      </div>
    </div>
  )
}

export default item;