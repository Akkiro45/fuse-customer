import React from 'react';

import module from './Category.module.css';
import Space from '../Space/Space';
import Label from '../Label/Label';
import SelectLabel from '../SelectLabel/SelectLabel';
import { getSelect } from '../../../shared/utility';
import AddIcon from '../../UI/Icons/Add/Add';
import CrossIcon from '../../UI/Icons/Cross/Cross';

const category = (props) => {
  return (
    <div className={module.Category} >
      <Space />
      <Label no >Shop Category</Label>
      {
        props.shopCategories.map((category, i) => {
          return (
            <div className={module.LabelPair} key={i} >
              <div className={module.Left} style={{ width: '85%' }} >
                <SelectLabel value={category.category} width='90%' />
              </div>
              <div className={module.Left} style={{ width: '8%' }} >
                <div 
                  className={module.LabelIcon} 
                  onClick={() => props.onRmvCatClick('shopCategories', category.category)}
                    ><CrossIcon />
                </div>
              </div>
            </div>   
            );
        })
      }
      <div className={module.Pair} >
        <div className={module.Left} style={{ width: '85%' }} >
          {getSelect(props.category, props.shopCategoriesOptions, props.onSelectHandler, 'category')}
        </div>
        <div className={module.Left} style={{ width: '8%' }} >
          <div 
            className={module.Icon} 
            onClick={() => props.onIconClick('shopCategories', { category: props.category.value }, 'category')}
              ><AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default category;