import axios from '../../axios';

import * as actionTypes from './actionTypes';
import { shopFound } from './index';
import { domainNameChecker } from '../../shared/utility';

export const checkDomainStart = () => {
  return {
    type: actionTypes.CHECK_DOMAIN_START
  }
}

export const checkDomainFail = (error) => {
  return {
    type: actionTypes.CHECK_DOMAIN_FAIL,
    error
  }
}

export const checkDomainFailConfirm = () => {
  return {
    type: actionTypes.CHECK_DOMAIN_FAIL_CONFIRM
  }
}

export const checkDomainSuccess = () => {
  return {
    type: actionTypes.CHECK_DOMAIN_SUCCESS
  }
}

export const createShopStart = () => {
  return {
    type: actionTypes.CREATE_SHOP_START
  }
}

export const createShopFail = (error) => {
  return {
    type: actionTypes.CREATE_SHOP_FAIL,
    error
  }
}

export const createShopSuccess = () => {
  return {
    type: actionTypes.CREATE_SHOP_SUCCESS
  }
}

export const checkShopDomain = (name) => {
  return dispatch => {
    dispatch(checkDomainStart());
    if(domainNameChecker(name)) {
      axios.get(`/shop/check-name/${name}`)
      .then(response => {
        if(response) {
          if(response.data.status === 'ok') {
            dispatch(checkDomainSuccess());
          } else {
            dispatch(checkDomainFail('Domain name does not available!'));
          }
        } else {
          dispatch(checkDomainFail('Domain name does not available!'));
        }
      })
      .catch(error => {
        dispatch(checkDomainFail('Domain name does not available!'));
      });
    } else {
      dispatch(checkDomainFail('Domain name does not available!'));
    }
  }
}

export const createShop = (token, body) => {
  return dispatch => {
    dispatch(createShopStart());
    const headers = {
      'x-auth': token 
    }
    body.sessionID = localStorage.getItem('sessionID');
    axios.post(`/shop/create-shop/`, body, {headers})
      .then(response => {
        if(response.data.status === 'ok') {
          if(response.data.data._id) {
            dispatch(createShopSuccess());
            dispatch(shopFound(response.data.data._id, response.data.data.shopName, response.data.data.isStatic));
          }
        } else {
          dispatch(createShopFail('Something went wrong!'));
        }
      })
      .catch(error => {
        if(error.response) {
           dispatch(createShopFail(error.response.data.error.msg));
          }
        else {
          dispatch(createShopFail('Something went wrong!'));
        }
      });
  }
}