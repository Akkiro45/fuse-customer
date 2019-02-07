import React from 'react';

import module from './ImageUploader.module.css';
import Space from '../../Shop/Space/Space';
import FileInput from '../FileInput/FileInput';
import Button from '../FormButton/Button';

const imageUploader = (props) => {
  return (
    <div className={module.Photo} >
      <Space />
      <div className={module.PhotoTitle} >
        {props.title}
      </div>
      <div className={module.PhotoBox} >
        {/* eslint-disable-next-line  */}
        <img src={props.src} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className={module.PhotoButtons} >
        <div className={module.SideSpace} >
          <div className={module.ButtonGroup} >  
            <div style={{ position: 'relative', top: '15px' }} >
              <FileInput onChange={props.onFileSelect} />
            </div>
            <div style={{ position: 'relative', top: '35px' }} >
              <Button onClick={props.onUpload} width='120px' >Upload</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default imageUploader;