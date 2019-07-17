import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/Auxx/Auxx';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Index from './components/Index/Index';
import * as actions from './store/actions/index';
import SpinnerPage from './components/UI/SpinnerPage/SpinnerPage';
import {PageView, initGA} from './components/Tracking/Tracking';
// Asynnc Loading
import Signup from './conatainer/Auth/Signup/Signup';
import Signin from './conatainer/Auth/Signin/Signin';
import Logout from './conatainer/Auth/Logout/Logout';
import Create from './conatainer/Shop/Create/Create';
import ResetPass from './components/ResetPass/ResetPass';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
// const asyncCreate = asyncComponent(() => {
//   return import('./conatainer/Shop/Create/Create');
// });
const AsyncLayout = asyncComponent(() => {
  return import('./conatainer/Layout/Layout');
});
const AsyncTAC = asyncComponent(() => {
  return import('./components/TAC/TAC');
});
const AsyncPrivacyPolicy = asyncComponent(() => {
  return import('./components/TAC/UserPrivacyPolicy/UserPrivacyPolicy');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup(this.props.token);
    initGA();
    PageView();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/forgot/password" component={ForgotPassword} />
        <Route path="/reset/password" component={ResetPass} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/signin" component={Signin} />
        <Route path="/auth/tandc/privacy-policy" component={AsyncPrivacyPolicy} />
        <Route path="/auth/tandc" component={AsyncTAC} />
        <Route path="/" exact component={Index} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      if(this.props.isShopExist) {
        if(this.props.isStatic) {
          routes = (
            <Switch>
              <Route path="/auth/logout" component={Logout} />
              <Route path="/auth/tandc/privacy-policy" component={AsyncPrivacyPolicy} />
              <Route path="/auth/tandc" component={AsyncTAC} />
              <Route path="/shop/inventory" component={() => <AsyncLayout type='inventory' />} />
              <Route path="/shop/profile" component={() => <AsyncLayout type='profile' />} />
              <Redirect to="/shop/inventory" />
            </Switch>
          );
        } else {
          routes = (
            <Switch>
              <Route path="/auth/logout" component={Logout} />
              <Route path="/auth/tandc/privacy-policy" component={AsyncPrivacyPolicy} />
              <Route path="/auth/tandc" component={AsyncTAC} />
              <Route path="/shop/inventory" component={() => <AsyncLayout type='inventory' />} />
              <Route path="/shop/profile" component={() => <AsyncLayout type='profile' />} />
              <Route path="/shop/orders" component={() => <AsyncLayout type='orders' />} />
              <Redirect to="/shop/orders" />
            </Switch>
          );
        }
      } else {
        routes = (
          <Switch>
            <Route path="/auth/logout" component={Logout} />
            <Route path="/auth/tandc/privacy-policy" component={AsyncPrivacyPolicy} />
            <Route path="/auth/tandc" component={AsyncTAC} />
            <Route path="/shop/create" component={Create} />
            <Redirect to="/shop/create" />
          </Switch>
        );
      }
    }
    if(this.props.loading) {
      routes = ( <SpinnerPage /> );
    }
    return (
      <Aux>
        {routes}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    isShopExist: state.auth.shopID !== null,
    isStatic: state.auth.isStatic
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: (token) => dispatch(actions.authCheckState(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
