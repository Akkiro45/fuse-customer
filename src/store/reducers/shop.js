import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  domain: false,
  loading: false,
  error: null
}

const checkDomainStart = (state, action) => {
  return updateObject(state, { loading: true, domain: false, error: null });
}

const checkDomainFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}
const checkDomainFailConfirm = (state, action) => {
  return updateObject(state, { error: null });
}

const checkDomainSuccess = (state, action) => {
  return updateObject(state, { loading: false, domain: true });
}
const createShopStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
}

const createShopFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}

const createShopSuccess = (state, action) => {
  return updateObject(state, { loading: false });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    domain: false,
    loading: false,
    error: null
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.CHECK_DOMAIN_START: return checkDomainStart(state, action);
    case actionTypes.CHECK_DOMAIN_FAIL: return checkDomainFail(state, action);
    case actionTypes.CHECK_DOMAIN_SUCCESS: return checkDomainSuccess(state, action);
    case actionTypes.CHECK_DOMAIN_FAIL_CONFIRM: return checkDomainFailConfirm(state, action);
    case actionTypes.CREATE_SHOP_START: return createShopStart(state, action);
    case actionTypes.CREATE_SHOP_FAIL: return createShopFail(state, action);
    case actionTypes.CREATE_SHOP_SUCCESS: return createShopSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;