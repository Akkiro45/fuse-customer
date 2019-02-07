import React, { Component } from 'react';

import module from './DeleteShop.module.css';
import Aux from '../../../../hoc/Auxx/Auxx';
import Button from '../../../UI/FormButton/Button';
import ErrorHandler from '../.././../../hoc/ErrorHandler/ErrorHandler';

class DeleteShop extends Component {
  state = {
    show: false
  }
  onClick = () => {
    this.setState({ show: true });
  }
  onBack = () => {
    this.setState({ show: false });
  }
  render() {
    let info = (
      <div>
        <div className={module.Msg} >Are you sure you want to delete shop?</div>
        <div className={module.Delete} >
          <Button onClick={this.props.onDeleteShop} width='150px' danger >Delete Shop</Button>
        </div>
      </div>
    );
    let modal = null;
    if(this.state.show) {
      modal = <ErrorHandler
        error={info}
        errorConformedhandler={this.onBack}
      />
    }
    return (
      <Aux>
        {modal}
        <div className={module.Title} >
          Danger Zone
        </div>
        <div className={module.Container} >
          <div className={module.Button} >
            <Button width='150px' danger onClick={this.onClick} >Delete Shop</Button>  
          </div>      
        </div>
      </Aux>
    );
  }
}

export default DeleteShop;