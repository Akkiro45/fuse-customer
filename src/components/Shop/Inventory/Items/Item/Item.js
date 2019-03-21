import React from 'react';

import module from './Item.module.css';
import { awsS3BucketUrl } from '../../../../../shared/utility';
import OSIcon from '../../../../UI/Icons/OS/OS';

const item = (props) => {
  let src = null;
  if(props.src) {
    src = awsS3BucketUrl + props.src.name;
  }
  let osi = null;
  if(props.data.outOfStock) {
    osi = (
      <div className={module.OSI} >
        <OSIcon />
      </div>
    );
  }
  return (
    <div className={module.Item} onClick={() => props.onClick(props.data)} >
      <div className={module.Photo} >
        {/* eslint-disable-next-line */}
        <img src={src} className={module.Img} />
        {osi}
      </div>
      <div className={module.Name} >
        {props.name}
      </div>
    </div>
  )
}

export default item;