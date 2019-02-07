import axios from '../../axios';

import * as actionTypes from './actionTypes';


export const fetchStart = () => {
  return {
    type: actionTypes.ORDER_FETCH_START
  }
}

export const fetchSuccess = (orders) => {
  return {
    type: actionTypes.ORDER_FETCH_SUCCESS,
    orders
  }
}

export const fetchFail = (error) => {
  return {
    type: actionTypes.ORDER_FETCH_FAIL,
    error
  }
}
export const fetcMorehStart = () => {
  return {
    type: actionTypes.ORDER_MORE_FETCH_START
  }
}

export const fetchMoreSuccessWithOrders = (orders) => {
  return {
    type: actionTypes.ORDER_MORE_FETCH_SUCCESS_WITH,
    orders
  }
}

export const fetchMoreSuccessWithoutOrders = (status) => {
  return {
    type: actionTypes.ORDER_MORE_FETCH_SUCCESS_WITHOUT,
    status
  }
}

export const fetchMoreFail = (error) => {
  return {
    type: actionTypes.ORDER_MORE_FETCH_FAIL,
    error
  }
}

export const updateStart = (orderID) => {
  return {
    type: actionTypes.UPDATE_START,
    orderID
  }
}

export const updateFail = (error) => {
  return {
    type: actionTypes.UPDATE_FAIL,
    error
  }
}

export const updateSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    data
  }
}

export const confirmedUpdateError = () => {
  return {
    type: actionTypes.CONFIRMED_UPDATE_ERROR
  }
}

export const clearOldOrders = () => {
  return {
    type: actionTypes.CLEAR_OLD_ORDERS
  }
}

export const fetchOrders = (pageNumber, pageSize, status, token) => {
  return dispatch => {
    dispatch(fetchStart());
    const headers = {
      'x-auth': token 
    }
    axios.get(`/customer/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`, {headers})
      .then(response => {
        dispatch(fetchSuccess(response.data.data));
      })
      .catch(error => {
        dispatch(fetchFail(error));
      });
  }
}

export const fetchMoreOrders = (pageNumber, pageSize, status, token) => {
  return dispatch => {
    dispatch(fetcMorehStart());
    const headers = {
      'x-auth': token 
    }
    axios.get(`/customer/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}`, {headers})
      .then(response => {
        if(response.data.data.length > 0)
          dispatch(fetchMoreSuccessWithOrders(response.data.data));
        else 
          dispatch(fetchMoreSuccessWithoutOrders(status + 2));
      })
      .catch(error => {
        dispatch(fetchMoreFail(error));
      });
  }
}

export const onUpdateOrder = (token, body) => { 
  return dispatch => {
    dispatch(updateStart(body.orderID));
    const headers = {
      'x-auth': token 
    }
    axios.post(`/customer/status`, body, {headers})
      .then(response => {
        dispatch(updateSuccess(response.data.data));
      })
      .catch(error => {
        if(error.response) 
          dispatch(updateFail(error.response.data.error.msg));
      });
  }
}