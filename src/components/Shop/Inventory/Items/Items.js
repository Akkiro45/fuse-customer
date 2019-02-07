import React from 'react';

import module from './Items.module.css';
import Item from './Item/Item';
import AddIcon from '../../../UI/Icons/Add/Add';
import CrossIcon from '../../../UI/Icons/Cross/Cross';

const items = (props) => {
  let item = [];
  if(props.items) {
    item = props.items.map((item, i) => {
      return <Item 
        key={i}
        name={item.name} 
        data={item}
        src={item.src} 
        onClick={props.onItemClick} />
    });
  }
  if(item.length === 0) {
    item = (
      <div className={module.Msg} >
        No item yet.  
      </div>
    );
  }
  return (
    <div className={module.Items} >
      <div className={module.Container} >
        <div className={module.Category} >
          <div style={{ float: 'left' }} >
            {props.category}
          </div>
          <div style={{ float: 'right', cursor: 'pointer' }} >
            <CrossIcon onClick={props.onRemoveCat} />
          </div>
        </div>
        <div className={module.Content} >
          <div className={module.AddIcon} >
            <div className={module.Icon} >
              <AddIcon onClick={props.onIconClick} />
            </div>
          </div>
          {item}
        </div>
      </div>
    </div>
  );
}

export default items;