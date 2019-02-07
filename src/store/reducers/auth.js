import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
// import { authFailConfirm } from '../actions';
// import { keepShop } from '../actions/auth';

const initialState = {
  token: null,
  custID: null,
  shopID: null,
  shopName: null,
  isStatic: null,
  error: null,
  loading: false
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    custID: action.custID,
    error: null,
    loading: false
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    custID: null,
    shopID: null,
    shopName: null,
    loading: false
  });
}


const authFailConfirm = (state, action) => {
  return updateObject(state, {
    error: null,
    token: null,
    custID: null
  });
}

const shopFound = (state, action) => {
  return updateObject(state, {
    shopID: action.shopID,
    shopName: action.shopName,
    isStatic: action.isStatic
  });
}

const shopNotFound = (state, action) => {
  return updateObject(state, {
    shopID: null,
    shopName: null
  });
}

const keepShop = (state, action) => {
  return updateObject(state, {
    shopID: action.shopID,
    shopName: action.shopName,
    isStatic: action.isStatic
  });
}
const shopNameChanged = (state, action) => {
  return updateObject(state, {
    shopName: action.shopName
  })
}
const isStaticChanged = (state, action) => {
  return updateObject(state, {
    isStatic: action.isStatic
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_FAIL_CONFIRM: return authFailConfirm(state, action);
    case actionTypes.SHOP_FOUND: return shopFound(state, action);
    case actionTypes.SHOP_NOT_FOUND: return shopNotFound(state, action);
    case actionTypes.KEEP_SHOP: return keepShop(state, action);
    case actionTypes.SHOPNAME_CHANGED: return shopNameChanged(state, action);
    case actionTypes.ISSTATIC_CHANGED: return isStaticChanged(state, action);
    default: return state;
  }
}

export default reducer;
