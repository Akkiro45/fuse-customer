import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxx/Auxx';
import Spinner from '../../../components/UI/SpinnerPage/SpinnerPage';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout(this.props.token);
  } 
  render() {
    let loading = null;
    if(this.props.loading) {
      loading = <Spinner />;
    }
    return (
      <Aux>
        <Redirect to='/' />
        {loading}
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: (token) => dispatch(actions.onLogout(token))
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
