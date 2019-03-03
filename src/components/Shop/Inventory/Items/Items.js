import React, { Component } from 'react';

import module from './Items.module.css';
import Item from './Item/Item';
import AddIcon from '../../../UI/Icons/Add/Add';
import CrossIcon from '../../../UI/Icons/Cross/Cross';
import Popup from '../../../../hoc/ErrorHandler/ErrorHandler';
import Button from '../../../UI/RButton/Button';

class Items extends Component {
  state = {
    popup: false
  }
  togglePopup = () => {
    this.setState(prevState => {
      return { popup: !prevState.popup };
    });
  }
  removeCat = () => {
    this.setState({ popup: false });
    this.props.onRemoveCat();
  }
  render() {
    let body = (
      <div>
        <div className={module.Error} >
          Are you sure you want to delete {this.props.category} category?
        </div>
        <div className={module.Buttons} >
          <div className={module.Button} >
            <Button onClick={this.removeCat} >Yes</Button>
          </div>
          <div className={module.Button} >
            <Button onClick={this.togglePopup} >No</Button>
          </div>
        </div>
      </div>
    )
    let popup = (
      <Popup 
        error={this.state.popup ? body : null}
        errorConformedhandler={this.togglePopup}
      />
    );
    let item = [];
    if(this.props.items) {
      item = this.props.items.map((item, i) => {
        return <Item 
          key={i}
          name={item.name} 
          data={item}
          src={item.photo} 
          onClick={this.props.onItemClick} />
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
        {popup}
        <div className={module.Container} >
          <div className={module.Category} >
            <div style={{ float: 'left' }} >
              {this.props.category}
            </div>
            <div style={{ float: 'right', cursor: 'pointer' }} >
              <CrossIcon onClick={this.togglePopup} />
            </div>
          </div>
          <div className={module.Content} >
            <div className={module.AddIcon} >
              <div className={module.Icon} >
                <AddIcon onClick={this.props.onIconClick} />
              </div>
            </div>
            {item}
          </div>
        </div>
      </div>
    );
  }
}

export default Items;