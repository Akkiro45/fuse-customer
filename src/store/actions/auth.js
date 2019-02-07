import axios from '../../axios';

import * as actionTypes from './actionTypes';
import { validateForm } from '../../shared/utility';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, custID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    custID
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const authFailConfirm = () => {
  return {
    type: actionTypes.AUTH_FAIL_CONFIRM
  }
}

export const logout = () => {
  localStorage.removeItem('sessionID');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const shopFound = (shopID, shopName, isStatic) => {
  return {
    type: actionTypes.SHOP_FOUND,
    shopID,
    shopName,
    isStatic
  }
}

export const shopNotFound = () => {
  return {
    type: actionTypes.SHOP_NOT_FOUND,
  }
}

export const keepShop = (shopID, shopName, isStatic) => {
  return {
    type: actionTypes.KEEP_SHOP,
    shopID,
    shopName,
    isStatic
  }
}

export const shopNameChanged = (shopName) => {
  return {
    type: actionTypes.SHOPNAME_CHANGED,
    shopName
  }
}
export const isStaticChanged = (isStatic) => {
  return {
    type: actionTypes.ISSTATIC_CHANGED,
    isStatic
  }
}

export const auth = (data, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let valid = validateForm(data, isSignup); 
    if(valid.valid) {
      let url = '/customer/login';
      if(isSignup) url = '/customer/signup';
      axios.post(url, data)
        .then(response => {
          if(response.data.status === 'ok' && response.headers['x-auth']  && response.headers['x-auth'] !== undefined) {
            localStorage.setItem('sessionID', response.data.sessionID);
            dispatch(authSuccess(response.headers['x-auth'], response.data.data.custID));
            if(response.data.data.shop) {
              if(response.data.data.shop._id) {
                dispatch(shopFound(response.data.data.shop._id, response.data.data.shop.shopName, response.data.data.shop.isStatic));
              } else {
                dispatch(shopNotFound());
              }
            } else {
              dispatch(shopNotFound());
            }
          } else {
            dispatch(authFail('Something went wrong!'));
          }
        })
        .catch(error => {
          if(error.response) {
            if(error.response.data.status === 'error') {
              dispatch(authFail(error.response.data.error.e || error.response.data.error.msg));
            }
          } else {
            dispatch(authFail('Something went wrong!'));
          }
        });
    } else {
      dispatch(authFail(valid.msg));
    }
  }
}

export const authCheckState = (token) => {
  return dispatch => {
    dispatch(authStart());
    const sessionID = localStorage.getItem('sessionID');
    if(!sessionID) {
      dispatch(logout());
    } else {
      axios.get(`/session/${sessionID}`)
        .then(response => {
          if(response.data.status === 'ok' && response.headers['x-auth']  && response.headers['x-auth'] !== undefined) {
            dispatch(authSuccess(response.headers['x-auth'], response.data.custID));     
            if(response.data.shop) {
              dispatch(keepShop(response.data.shop._id, response.data.shop.shopName, response.data.shop.isStatic));
            } else {
              dispatch(shopNotFound());
            }
          } else {
            throw new Error('error');
          }
        })
        .catch(error => {
          dispatch(onLogout(token));
        });
    }
  }
}

export const onLogout = (token) => {
  return dispatch => {
    const sessionID = localStorage.getItem('sessionID');
    const headers = {
      'x-auth': token 
    }
    dispatch(authStart());
    if(!sessionID) {
      dispatch(logout());
    } else {
      axios.delete(`/customer/logout/${sessionID}`, {headers})
        .then(() => {
          dispatch(logout());
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }
}
