import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  data: null,
  loading: false,
  error: null
}

const uploadPhotoStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
}
const uploadPhotoFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}
const uploadPhotoSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, data: action.data });
}
const uploadPhotoClear = (state, action) => {
  return updateObject(state, { data: null, loading: false, error: null });
}
const authLogout = (state, action) => {
  return updateObject(state, {
    data: null,
    loading: false,
    error: null
  });
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.PHOTO_UPLOAD_START: return uploadPhotoStart(state, action);
    case actionTypes.PHOTO_UPLOAD_FAIL: return uploadPhotoFail(state, action);
    case actionTypes.PHOTO_UPLOAD_SUCCESS: return uploadPhotoSuccess(state, action);
    case actionTypes.PHOTO_UPLOAD_CLEAR: return uploadPhotoClear(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;