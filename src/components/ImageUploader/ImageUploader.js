import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './ImageUploader.module.css';
import FileInput from '../UI/FileInput/FileInput';
import Button from '../UI/RButton/Button';
import Spinner from '../UI/Spinner/Spinner';
import { checkPhoto, awsS3BucketUrl } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class ImageUploader extends Component {
  state = {
    file: null,
    selectedImage: null,
    imageData: null,
    error: null
  }
  onFileSelect = (e) => {
    if(e.target.files && e.target.files[0]) {
      if(checkPhoto(e.target.files[0])) {
        this.setState({ file: e.target.files[0], selectedImage: URL.createObjectURL(e.target.files[0]), error: null });
      } else {
        this.setState({ error: 'Please select image file with jpeg or png extention and size must not be greater tham 1MB!' });
      }
    }
  }
  onUpload = () => {
    if(this.state.file) {
      this.props.uploadPhoto(this.state.file, this.props.token, this.props.update);
    } else {
      this.setState({ error: 'Please Select Photo!' });
    }
  }
  componentWillUpdate(nextProps) {
    if(nextProps.data) {
      this.props.onPhotoUploaded(nextProps.data);
    }
  }
  componentDidMount() {
    this.props.photoUploadClear();
  }
  render() {
    let src = this.state.selectedImage;
    if(this.props.src) {
      src =  awsS3BucketUrl + this.props.src.name;  
    }
    if(this.state.selectedImage) {
      src = this.state.selectedImage;
    }
    let buttons = (
      <div className={module.Buttons} >
        <div className={module.Button} >
          <FileInput
            onChange={this.onFileSelect} 
            style={{ width: '100px', height: '30px' }} />
        </div>
        <div className={module.Button} >
          <Button onClick={this.onUpload} >Upload</Button>
        </div>
      </div>
    );
    if(this.props.data) {
      buttons = null;
    }
    let error = null;
    if(this.state.error) {
      error = (
        <div className={module.Error} >
          {this.state.error}
        </div>
      );
    }
    if(this.props.error) {
      error = (
        <div className={module.Error} >
          Unable to Upload Photo!
        </div>
      );
    }
    let success = null;
    if(this.props.data && !this.state.error && !this.props.error) {
      success = (
        <div className={module.Success} >
          Photo Uploaded Successfully!
        </div>
      );
    }
    let ren = (
      <div className={module.Photo} >
        <div className={module.PContainer} >
          {/* eslint-disable-next-line  */}
          <img src={src} />
        </div>
        {error}
        {success}
        {buttons}
      </div>
    );
    if(this.props.loading) {
      ren = <Spinner />;
    }
    return ren;
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    data: state.upload.data,
    loading: state.upload.loading,
    error: state.upload.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadPhoto: (image, token, isUpdate) => dispatch(actions.uploadPhoto(image, token, isUpdate)),
    photoUploadClear: () => dispatch(actions.photoUploadClear())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);