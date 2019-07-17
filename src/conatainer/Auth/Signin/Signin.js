import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import module from './Signin.module.css';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/FormButton/Button';
import SpinnerPage from '../../../components/UI/SpinnerPage/SpinnerPage';
import Link from '../../../components/UI/Link/Link';
import {updateObject} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxx/Auxx';

class Signin extends Component {
  state = {
    form: {
      phoneNumber: {
        type: 'tel',
        placeholder: 'Mobile Number',
        value: '',
        name: 'phoneNumber',
        minLength: '10',
        maxLength: '10',
        autoComplete: 'off',
        required: false,
        width: '75%'
      },
      email: {
        type: 'email',
        placeholder: 'Email Address',
        value: '',
        name: 'email',
        minLength: '2',
        maxLength: 'none',
        autoComplete: 'off',
        required: false,
        width: '75%'
      },
      password: {
        type: 'password',
        placeholder: 'Password',
        value: '',
        name: 'password',
        minLength: '8',
        maxLength: '60',
        autoComplete: 'off',
        required: true,
        width: '75%'
      }
    }
  }

  inputChangedHandler = (e) => {
    const updatedValue = updateObject(this.state.form[e.target.name], { value: e.target.value });
    const updateForm = updateObject(this.state.form, { [e.target.name]: updatedValue });
    this.setState({ form: updateForm });
  }
  onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      phoneNumber: this.state.form.phoneNumber.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value
    }
    this.props.onAuth(data, false);
  }
  errorConformedhandler = () => {
    this.props.authFailConfirm()
  }

  render() {
    let errorMsg = null;
    let form = null, el = null, ren = null, redirect = null;
    if(this.props.error) {
      errorMsg = (
        <ErrorHandler error={this.props.error} errorConformedhandler={this.errorConformedhandler} />
      );
    }
    form = Object.keys(this.state.form).map(field => {
      el = this.state.form[field];
      return <Input 
        type={el.type}
        placeholder={el.placeholder}
        value={el.value}
        name={el.name}
        minLength={el.minLength}
        maxLength={el.maxLength}
        autoComplete={el.autoComplete}
        required={el.required}
        onChange={(e) => this.inputChangedHandler(e)}
        key={el.name}
        width={el.width}
      />
    });
    form.splice(1,0,<p key="divide" className={module.Divide} >OR</p>);
    if(this.props.isAuthenticated) {
      redirect = <Redirect to="/shop/create" />
    }
    ren = (
    <div className={module.View} >
      {redirect}
      <div className={module.Signin} >
        <div className={module.Box} >
          <div className={module.Left} >
            <div className={module.Text} >
              <Link to="/" exact remove >
                <h1>Fuse</h1>
              </Link>
              <p>Make your shop online.</p>
            </div>
          </div>
          <div className={module.Right} >
            {errorMsg}
            <form method="POST" onSubmit={this.onSubmitHandler} >
              {form}
              <Button>SIGNIN</Button>
              <br />
              <div className={module.Link} >
                <Link to="/auth/signup" >Click here to signup</Link>
              </div>
              <div className={module.Link} >
                <Link to="/forgot/password" >Forgot Password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
    if(this.props.loading) {
      ren = ( 
      <div>
        <SpinnerPage />
      </div> );
    }
    return (
      <Aux>
        {ren}
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (data, isSignup) => dispatch(actions.auth(data, isSignup)),
    authFailConfirm: () => dispatch(actions.authFailConfirm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
