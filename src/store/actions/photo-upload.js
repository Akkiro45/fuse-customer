import axios from '../../axios';

import * as actionTypes from './actionTypes';
import { updateProfile } from '../actions/index';

export const photoUploadStart = () => {
  return {
    type: actionTypes.PHOTO_UPLOAD_START
  }
}
export const photoUploadFail = (error) => {
  return {
    type: actionTypes.PHOTO_UPLOAD_FAIL,
    error
  }
}
export const photoUploadSuccess = (data) => {
  return {
    type: actionTypes.PHOTO_UPLOAD_SUCCESS,
    data
  }
}
export const photoUploadClear = () => {
  return {
    type: actionTypes.PHOTO_UPLOAD_CLEAR
  }
}

export const uploadPhoto = (image, token, isUpdate) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', image);
    const headers = {
      'x-auth': token 
    }
    dispatch(photoUploadStart());
    axios.post('/img/upload/', formData, {headers})
      .then(response => {
        if(response.data.status === 'ok') {
          dispatch(photoUploadSuccess(response.data.data));
          if(isUpdate) {
            dispatch(updateProfile(token, { shopPhotos : [response.data.data] }));
          }
        } else {
          dispatch(photoUploadFail('Error'));
        }
      })
      .catch(error => {
        dispatch(photoUploadFail('Error'));
      });
  }
} 

// export const uploadPhoto = (image, token, isUpdate) => {
//   return dispatch => {
//     const formData = new FormData();
//     formData.append('image', image);
//     const headers = {
//       'x-auth': token 
//     }
//     dispatch(photoUploadStart());
//     dispatch(photoUploadSuccess({ name: 'asas', type: 'image/jpg' }));
//   }
// } 