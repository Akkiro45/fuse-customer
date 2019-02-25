import React from 'react';

import module from './Item.module.css';

const item = (props) => {
  return (
    <div className={module.Item} onClick={() => props.onClick(props.data)} >
      <div className={module.Photo} >
        {/* eslint-disable-next-line */}
        <img src={props.src ? props.src : 'https://cdn.fstoppers.com/styles/full/s3/media/2015/12/07/white_background_bag_after.jpg'} className={module.Img} />
      </div>
      <div className={module.Name} >
        {props.name}
      </div>
    </div>
  )
}

export default item;