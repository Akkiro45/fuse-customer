import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  profile: null,
  loading: false,
  error: null
}

const profileFetchStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
}
const profileFetchFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}
const profileFetchSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, profile: action.data });
}
const confirmedError = (state, action) => {
  return updateObject(state, { loading: false, error: null });
}

const authLogout = (state, action) => {
  return updateObject(state, {
    profile: null,
    loading: false,
    error: null
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.PROFILE_FETCH_START: return profileFetchStart(state, action);
    case actionTypes.PROFILE_FETCH_FAIL: return profileFetchFail(state, action);
    case actionTypes.PROFILE_FETCH_SUCCESS: return profileFetchSuccess(state, action);
    case actionTypes.CONFIRMED_PROFILE_ERROR: return confirmedError(state, action);
    case actionTypes.PROFILE_UPDATE_START: return profileFetchStart(state, action);
    case actionTypes.PROFILE_UPDATE_FAIL: return profileFetchFail(state, action);
    case actionTypes.PROFILE_UPDATE_SUCCESS: return profileFetchSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;