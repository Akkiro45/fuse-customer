import axios from '../../axios';

import * as actionTypes from './actionTypes';
import { shopNameChanged, isStaticChanged, shopNotFound } from './index';

export const profileFetchStart = () => {
  return {
    type: actionTypes.PROFILE_FETCH_START
  }
}
export const profileFetchFail = (error) => {
  return {
    type: actionTypes.PROFILE_FETCH_FAIL,
    error
  }
}
export const profileFetchSuccess = (data) => {
  return {
    type: actionTypes.PROFILE_FETCH_SUCCESS,
    data
  }
}
export const profileUpdateStart = () => {
  return {
    type: actionTypes.PROFILE_UPDATE_START
  }
}
export const profileUpdateFail = (error) => {
  return {
    type: actionTypes.PROFILE_UPDATE_FAIL,
    error
  }
}
export const profileUpdateSuccess = (data) => {
  return {
    type: actionTypes.PROFILE_UPDATE_SUCCESS,
    data
  }
}
export const confirmedError = () => {
  return {
    type: actionTypes.CONFIRMED_PROFILE_ERROR
  }
}
export const fetchProfile = (token) => {
  return dispatch => {
    dispatch(profileFetchStart());
    const headers = {
      'x-auth': token 
    }
    axios.get(`/shop/get-profile`, {headers})
      .then(response => {
        if(response.data) {
          if(response.data.status === 'ok') {
            dispatch(profileFetchSuccess(response.data.data));
          } else {
            dispatch(profileFetchFail('Something went wrong!'));
          }
        } else {
          dispatch(profileFetchFail('Something went wrong!'));
        }
      })
      .catch(error => {
        dispatch(profileFetchFail('Unable to fetch Profile!'));
      });
  }
}
export const updateProfile = (token, body) => {
  return dispatch => {
    dispatch(profileUpdateStart());
    const headers = {
      'x-auth': token 
    }
    const sessionID = localStorage.getItem('sessionID');
    body.sessionID = sessionID;
    axios.post(`/shop/edit-shop`, body, {headers})
      .then(response => {
        if(response.data) {
          if(response.data.status === 'ok') {
            if(body.shopName) {
              dispatch(shopNameChanged(response.data.data.shopName));
            }
            if(body.isStatic === false) {
              dispatch(isStaticChanged(response.data.data.isStatic));
            }
            dispatch(profileUpdateSuccess(response.data.data));
          } else {
            dispatch(profileUpdateFail('Something went wrong!'));
          }
        } else {
          dispatch(profileUpdateFail('Something went wrong!'));
        }
      })
      .catch(error => {
        dispatch(profileUpdateFail('Unable to fetch Profile!'));
      });
  }
}

export const deleteShop = (token) => {
  return dispatch => {
    dispatch(profileUpdateStart());
    const headers = {
      'x-auth': token 
    }
    let data = {};
    const sessionID = localStorage.getItem('sessionID');
    data.sessionID = sessionID;
    axios.delete('/shop/delete', { headers, data })
      .then(response => {
        if(response.data) {
          if(response.data.status === 'ok') {
            dispatch(profileFetchStart(null));
            dispatch(shopNotFound());
          } else {
            dispatch(profileUpdateFail('Something went wrong!'));
          }
        } else {
          dispatch(profileUpdateFail('Something went wrong!'));
        }
      })
      .catch(error => {
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.status === 'error') {
              dispatch(profileUpdateFail(error.response.data.error.msg));
            }
          }
        }
      })
  }
}

