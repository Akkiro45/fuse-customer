import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: null,
  error: null,
  loading: false,
  updateError: null,
  updateLoading: false,
  current: null,
  moreLoading: false,
  done: [false, false, false, false, false, false, false]
}

const fetchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const fetchMoreStart = (state, action) => {
  return updateObject(state, { error: null, moreLoading: true });
}

const fetchFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
}

const fetchMoreFail = (state, action) => {
  return updateObject(state, { error: action.error, moreLoading: false });
}

const fetchSuccess = (state, action) => {
  let done = state.done.map(() => false);
  return updateObject(state, { orders: action.orders, loading: false, done });
}

const fetchMoreSucessWith = (state, action) => {
  let orders = state.orders;
  if(!orders) {
    orders = [];
  }
  return updateObject(state, { orders: orders.concat(action.orders), moreLoading: false });
}

const fetchMoreSucessWithout = (state, action) => {
  let done = state.done;
  done[action.status] = true;
  return updateObject(state, { moreLoading: false, done });
}

const updateStart = (state, action) => {
  return updateObject(state, { updateError: null, updateLoading: true, current: action.orderID });
}

const updateFail = (state, action) => {
  return updateObject(state, { updateLoading: false, updateError: action.error });
}

const updateSuccess = (state, action) => {
  let orders = state.orders.filter(order => order._id !== action.data._id);
  return updateObject(state, { updateLoading: false, orders, orderID: null });
}

const clearOldOrders = (state, action) => {
  return updateObject(state, { orders: null, loading: false });
}

const confirmedUpdateError = (state, action) => {
  return updateObject(state, { updateError: action.error, orderID: null });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    orders: null,
    error: null,
    loading: false,
    updateError: null,
    updateLoading: false,
    current: null,
    moreLoading: false,
    done: [false, false, false, false, false, false, false]
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.ORDER_FETCH_START: return fetchStart(state, action);
    case actionTypes.ORDER_FETCH_SUCCESS: return fetchSuccess(state, action);
    case actionTypes.ORDER_FETCH_FAIL: return fetchFail(state, action);
    case actionTypes.UPDATE_SUCCESS: return updateSuccess(state, action);
    case actionTypes.UPDATE_START: return updateStart(state, action);
    case actionTypes.UPDATE_FAIL: return updateFail(state, action);
    case actionTypes.CLEAR_OLD_ORDERS: return clearOldOrders(state, action);
    case actionTypes.CONFIRMED_UPDATE_ERROR: return confirmedUpdateError(state, action);
    case actionTypes.ORDER_MORE_FETCH_START: return fetchMoreStart(state, action);
    case actionTypes.ORDER_MORE_FETCH_FAIL: return fetchMoreFail(state, action);
    case actionTypes.ORDER_MORE_FETCH_SUCCESS_WITH: return fetchMoreSucessWith(state, action);
    case actionTypes.ORDER_MORE_FETCH_SUCCESS_WITHOUT: return fetchMoreSucessWithout(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;