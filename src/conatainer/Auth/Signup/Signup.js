import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import module from './Signup.module.css';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/FormButton/Button';
import CheckBox from '../../../components/UI/CheckBox/CheckBox';
import SpinnerPage from '../../../components/UI/SpinnerPage/SpinnerPage';
import Link from '../../../components/UI/Link/Link';
import {updateObject} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxx/Auxx';

class Signup extends Component {
  state = {
    form: {
      firstName: {
        type: 'text',
        placeholder: 'First Name',
        value: '',
        name: 'firstName',
        minLength: '2',
        maxLength: '60',
        autoComplete: 'off',
        required: true,
        width: '35.5%'
      },
      lastName: {
        type: 'text',
        placeholder: 'Last Name',
        value: '',
        name: 'lastName',
        minLength: '2',
        maxLength: '120',
        autoComplete: 'off',
        required: true,
        width: '35.5%'
      },
      phoneNumber: {
        type: 'tel',
        placeholder: 'Phone Number',
        value: '',
        name: 'phoneNumber',
        minLength: '10',
        maxLength: '10',
        autoComplete: 'off',
        required: true,
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
      },
      confirmPassword: {
        type: 'password',
        placeholder: 'Confirm Password',
        value: '',
        name: 'confirmPassword',
        minLength: '8',
        maxLength: '60',
        autoComplete: 'off',
        required: true,
        width: '75%'
      }
    },
    TAC: false
  }
  inputChangedHandler = (e) => {
    const updatedValue = updateObject(this.state.form[e.target.name], { value: e.target.value });
    const updateForm = updateObject(this.state.form, { [e.target.name]: updatedValue });
    this.setState({ form: updateForm });
  }
  checkBoxHandler = () => {
    this.setState((prevState) => {
      return { TAC: !prevState.TAC }
    });
  }
  onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      firstName: this.state.form.firstName.value,
      lastName: this.state.form.lastName.value,
      phoneNumber: this.state.form.phoneNumber.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value,
      confirmPassword: this.state.form.confirmPassword.value,
      tac: this.state.TAC
    }
    this.props.onAuth(data, true);
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
    if(this.props.isAuthenticated) {
      redirect = <Redirect to="/shop/create" />
    }
    ren = (
    <div className={module.View} >
      {redirect}
      <div className={module.Signup} >
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
              <div className={module.TAC} >
                <div className={module.TAC1} >
                  <div className={module.CheckBox} >
                    <CheckBox 
                      onChange={this.checkBoxHandler}
                      checked={this.state.TAC} />
                  </div> 
                  <div>
                    <Link to="/auth/tandc" >Terms and conditions</Link>
                  </div>
                </div>
              </div>
              <Button>SIGNUP</Button>
              <br />
              <div className={module.Link} >
                <Link to="/auth/signin" >Click here to login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
