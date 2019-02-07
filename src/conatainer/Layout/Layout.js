import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './Layout.module.css';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Aux from '../../hoc/Auxx/Auxx';
import Header from '../../components/Shop/Header/Header';
import Nav from '../../components/Shop/Nav/Nav';
import Profile from '../Shop/Profile/Profile';
import Inventory from '../Shop/Inventory/Inventory';
import Orders from '../Shop/Orders/Orders';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerColsedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  openSideDrawerHandler = () => {
    this.setState((prevState) => { 
        return {showSideDrawer: !prevState.showSideDrawer} 
    });
  }

  render() {
    let show = null;
    if(this.props.type === 'inventory') {
      show = ( <Inventory /> );
    } else if(this.props.type === 'profile') {
      show = ( <Profile /> );
    } else if(this.props.type === 'orders') {
      show = ( <Orders  /> );
    }
    let ren = (
      <div className={module.Layout} >
          <SideDrawer 
            isStatic={this.props.isStatic}
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerColsedHandler} />
          <div className={module.Header} >
            <Header openSideDrawerHandler={this.openSideDrawerHandler} shopName={this.props.shopName} />
          </div>
          <div className={module.Sidebar} >
            <Nav isStatic={this.props.isStatic} />
          </div>
          <div className={module.Window} >
            {show}
          </div>
      </div>
    );
    return (
      <Aux>
        {ren}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    shopName: state.auth.shopName,
    token: state.auth.token,
    isStatic: state.auth.isStatic
  }
}

export default connect(mapStateToProps, null)(Layout);