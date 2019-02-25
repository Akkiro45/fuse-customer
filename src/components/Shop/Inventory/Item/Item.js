import React from 'react';

import module from './Item.module.css';
import ImageUploader from '../../../UI/ImageUploader/ImageUploader';
import Label from '../../Label/Label';
import { getRInput, getRSelect } from '../../../../shared/utility';
import { mUnits } from '../../../../shared/option';
import Space from '../../Space/Space';
import Aux from '../../../../hoc/Auxx/Auxx';
import AddIcon from '../../../UI/Icons/Add/Add';
import CrossIcon from '../../../UI/Icons/Cross/Cross';
import Button from '../../../UI/FormButton/Button';
import BackIcon from '../../../UI/Icons/Back/Back';

const item = (props) => {
  let error = null;
  if(props.error) {
    error = (
      <div className={module.Error} >
        {props.error}
      </div>
    );
  }
  let mUnit = null;
  if(props.mUnits.value === 'other') {
    mUnit = (
      <Aux>
        <Space height='5px' />
        <div className={module.Input} >
          {getRInput(props.mUnit, props.inputHandler)}
        </div>
      </Aux>
    );
  }
  let values = null;
  values = props.mpValues.map((v, i) => {
    return (
      <div className={module.Mul1} key={i} >
        <div className={module.Ins} >
          <div className={module.Value} >
            {v.mValue}
          </div>
          <div className={module.Value} >
            {v.price}
          </div>
        </div>
        <div className={module.CIcon} >
          <CrossIcon onClick={() => props.onRmvValue(v.mValue)} />
        </div>
      </div>
    );
  });
  let buttons = (
    <div className={module.Button} >
      <Button width='120px' onClick={props.finalButtonHandler} >{props.fianlButton}</Button>
    </div>
  );
  if(props.update) {
    buttons = (
      <Aux>
        <div className={module.Button} >
          <Button width='120px' height='50px' onClick={props.updateButtonHandler} >{props.updateButton}</Button>
        </div>
        <div className={module.Button} >
          <Button width='120px' height='50px' onClick={props.deleteButtonHandler} >{props.deleteButton}</Button>
        </div>
      </Aux>
    );
  }
  return (
    <div className={module.Item} >
      <div className={module.Title} >
        <div className={module.BIcon} >
          <BackIcon onClick={() => props.onBack(props.update ? 'icon' : 'item')} />
        </div>
        {props.update ? 'Update' : 'Add New'} Item
      </div>
      <ImageUploader
        title={'Item Photo'}
        src={props.src} 
        onFileSelect={props.onFileSelect} 
        onUpload={props.onUpload}
      />
      <div className={module.Inputs} >
        <Label>Name</Label>
        <div className={module.Input} >
          {getRInput(props.name, props.inputHandler)}
        </div>
        <Space height='10px' />
        <Label>Measure Unit</Label>
        <div className={module.Input} >
          {getRSelect(props.mUnits, mUnits, props.selectHandler, 'mUnits')}
        </div>
        {mUnit}
        <Space height='10px' />
        <Label>Measure Value</Label>
        <div className={module.Mul} >
          <div className={module.Ins} >
            <div className={module.Input1} >
              {getRInput(props.mValue, props.inputHandler)}
            </div>
            <div className={module.Input1} >
              {getRInput(props.price, props.inputHandler)}
            </div>
          </div>
          <div className={module.Icon} >
            <AddIcon onClick={props.onAddValue} />
          </div>
        </div>
        {values}
        <Space height='10px' />
        <Label>Description</Label>
        <div className={module.Input} >
          {getRInput(props.description, props.inputHandler)}
        </div>
      </div>
      {error}
      <div className={module.Buttons} >  
        {buttons}
      </div>
    </div>
  );
}

export default item;