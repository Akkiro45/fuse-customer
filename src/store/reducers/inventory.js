import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  items: [],
  itemCategories: [],
  loading: false,
  error: null
}

const invFetchStart = (state, action) => {
  return updateObject(state, { loading: true, items: [], itemCategories: [], error: null });
}

const invFetchFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
} 

const invFetchSuccess = (state, action) => {
  return updateObject(state, { loading: false, items: action.items, itemCategories: action.itemCategories });
}

const errorConfirmed = (state, action) => {
  return updateObject(state, { error: null, updateError: null });
}

const invUpdateStart = (state, action) => {
  return updateObject(state, { loading: true, updateError: null });
}

const invUpdateFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}

const invUpdateSuccess = (state, action) => {
  return updateObject(state, { loading: false, items: action.items, itemCategories: action.itemCategories });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    items: [],
    itemCategories: [],
    loading: false,
    error: null
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.INV_FETCH_START: return invFetchStart(state, action);
    case actionTypes.INV_FETCH_FAIL: return invFetchFail(state, action);
    case actionTypes.INV_FETCH_SUCCESS: return invFetchSuccess(state, action);
    case actionTypes.INV_ERROR_CONFIRM: return errorConfirmed(state, action);
    case actionTypes.INV_UPDATE_START: return invUpdateStart(state, action);
    case actionTypes.INV_UPDATE_FAIL: return invUpdateFail(state, action);
    case actionTypes.INV_UPDATE_SUCCESS: return invUpdateSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;