import React from 'react';

import module from './ItemInfo.module.css';
import { getInput } from '../../../../shared/utility';
import Button from '../../../UI/FormButton/Button';
import Label from '../../Label/Label';
import Space from '../../Space/Space';
import ImageUploader from '../../../UI/ImageUploader/ImageUploader';

const itemInfo = (props) => {
  let error = null;
  if(props.error) {
    error = (
      <div className={module.Error} >
        {props.error}
      </div>
    );
  }
  let buttons = (
    <div className={module.FButton} >
      <Button width='120px' onClick={props.finalButtonHandler} >{props.fianlButton}</Button>
    </div>
  );
  if(props.update) {
    buttons = (
      <div>
        <div className={module.FButton} >
          <Button width='120px' height='50px' onClick={props.updateButtonHandler} >{props.updateButton}</Button>
        </div>
        <Space />
        <div className={module.FButton} >
          <Button width='120px' height='50px' onClick={props.deleteButtonHandler} >{props.deleteButton}</Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={module.Title} >
        {props.title}
      </div>
      <ImageUploader title='Item Photo' src={props.src} onFileSelect={props.onFileSelect} onUpload={props.onUpload} />
      <div className={module.Form} >
        <Space />
        <Label>Name</Label>
        {getInput(props.name, props.inputHandler)}
        <Label>Measure Unit</Label>
        {getInput(props.mUnit, props.inputHandler)}
        <Label>Measure Value</Label>
        {getInput(props.mValue, props.inputHandler)}
        <Label>Price</Label>
        {getInput(props.price, props.inputHandler)}
        <Label>Description</Label>
        {getInput(props.description, props.inputHandler)}
      </div>
      {error}
      <Space />
      {buttons}
    </div>
  );
}

export default itemInfo;