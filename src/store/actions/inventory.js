import axios from '../../axios';

import * as actionTypes from './actionTypes';

export const invFetchStart = () => {
  return {
    type: actionTypes.INV_FETCH_START
  }
}

export const invFetchFail = (error) => {
  return {
    type: actionTypes.INV_FETCH_FAIL,
    error
  }
}

export const invFetchSuccess = (items, itemCategories) => {
  return {
    type: actionTypes.INV_FETCH_SUCCESS,
    items,
    itemCategories
  }
}
export const invUpdateStart = () => {
  return {
    type: actionTypes.INV_UPDATE_START
  }
}

export const invUpdateFail = (error) => {
  return {
    type: actionTypes.INV_UPDATE_FAIL,
    error
  }
}

export const invUpdateSuccess = (items, itemCategories) => {
  return {
    type: actionTypes.INV_UPDATE_SUCCESS,
    items,
    itemCategories
  }
}

export const errorConfirmed = () => {
  return {
    type: actionTypes.INV_ERROR_CONFIRM
  }
}

export const fetchInv = (token, body, type) => {
  return dispatch => {
    dispatch(invFetchStart());
    const headers = {
      'x-auth': token 
    }
    axios.get(`/shop/get-inventory`, {headers})
      .then(response => {
        if(response.data) {
          if(response.data.status === 'ok') {
            dispatch(invFetchSuccess(response.data.data.items, response.data.data.itemCategories));
          } else {
            dispatch(invFetchFail('Something went wrong!'));
          }
        } else {
          dispatch(invFetchFail('Something went wrong!'));
        }
      })
      .catch(error => {
        dispatch(invFetchFail('Unable to fetch Inventory!'));
      });
  }
}

export const updateInv = (token, body, type) => {
  return dispatch => {
    dispatch(invUpdateStart());
    const headers = {
      'x-auth': token 
    }
    axios.post(`/shop/edit-inventory/${type}`, body, {headers})
      .then(response => {
        if(response.data) {
          if(response.data.status === 'ok') {
            dispatch(invUpdateSuccess(response.data.data.items, response.data.data.itemCategories));
          } else {
            dispatch(invUpdateFail('Something went wrong!'));
          }
        } else {
          dispatch(invUpdateFail('Something went wrong!'));
        }
      })
      .catch(error => {
        dispatch(invUpdateFail('Unable to Update!'));
      });
  }
}