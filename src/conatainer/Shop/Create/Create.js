import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import module from './Create.module.css';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';
import Space from '../../../components/Shop/Space/Space';
import Label from '../../../components/Shop/Label/Label';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Aux from '../../../hoc/Auxx/Auxx';
import Button from '../../../components/UI/FormButton/Button';
import CrossIcon from '../../../components/UI/Icons/Cross/Cross';
import CheckIcon from '../../../components/UI/Icons/Check/Check';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ImageUploader from '../../../components/UI/ImageUploader/ImageUploader';
import { validateCreateShop1, getInput, getSelect } from '../../../shared/utility';
import { shopCategories, linksType, deliveryService, states } from '../../../shared/option';
import { ShopState } from '../../../shared/shopState';
import Category from '../../../components/Shop/Category/Category';
import SocialMedia from '../../../components/Shop/SocialMedia/SocialMedia';


class Create extends Component {
  state = {
    data: {
      ...ShopState
    },
    file: null,
    image: null,
    error: null,
    next: false,
    uploded: false,
    finalData: null
  }
  onDomainCheck = () => {
    this.props.checkShopDomain(this.state.data.domain.value);
    this.setState({ show: true });
  }
  onFileSelect = (e) => {
    if(e.target.files && e.target.files[0]) {
      let type = e.target.files[0].type;
      if(type === 'image/jpeg' || type === 'image/png') {
        this.setState({ file: e.target.files[0], image: URL.createObjectURL(e.target.files[0]) });
      } else {
        this.setState({ error: 'Please select image file with jpeg/png extention' });
      }
    }
  }
  onUpload = () => {
    if(this.state.file) {
      const updatedshopPhoto = updateObject(this.state.data.shopPhoto, { name: this.state.file.name, type: this.state.file.type });
      const updateData = updateObject(this.state.data, { shopPhoto: updatedshopPhoto });
      this.setState({ uploded: true, data: updateData });
    } else {
      this.setState({ error: 'Please Select Photo!' });
    }
  }
  errorConformedhandler = () => {
    if(this.state.error) {
      this.setState({ error: null });
    }
    this.props.checkDomainFailConfirm();
  }
  inputChangedHandler = (e) => {
    const updatedValue = updateObject(this.state.data[e.target.name], { value: e.target.value });
    const updateData = updateObject(this.state.data, { [e.target.name]: updatedValue });
    this.setState({ data: updateData, show: false });
  }
  onSelectHandler = (e, type) => {
    let field;
    field = updateObject(this.state.data[type], { value: e.target.value });
    let data = updateObject(this.state.data, { [type]: field });
    this.setState({ data });
  }
  onIconClick = (field, obj, type) => {
    if(this.state.data[type].value === 'Category*') {
      this.setState({ error: 'Please select valid option!' });
    } else if(type === 'linksType' && this.state.data.link.value === '') {
      this.setState({ error: 'Please enter value in account name!' });
    } else {
      let updatedField = [...this.state.data[field]];
      if(type === 'category') {
        updatedField = updatedField.filter(cat => cat.category !== obj.category);
      } else if(type === 'linksType') {
        updatedField = updatedField.filter(lt => lt.type !== obj.type);
      }
      updatedField.push(obj);
      let data = updateObject(this.state.data, { [field]: updatedField });
      this.setState({ data });
    }
  }
  onRmvCatClick = (field, value) => {
    let updatedArr;
    if(field === 'socialLinks') {
      updatedArr = this.state.data[field].filter(s => s.type !== value);
    } else if(field === 'shopCategories') {
      updatedArr = this.state.data[field].filter(cat => cat.category !== value);
    }
    let data = updateObject(this.state.data, { [field]: updatedArr });
    this.setState({ data });
  }
  onClickNext = () => {
    let valid = validateCreateShop1(this.state.data);
    if(valid.valid) {
      this.setState({ next: true, finalData: valid.data });
    } else {
      this.setState({ error: valid.msg });
    }
  }
  onBack = () => {
    this.setState({ next: false });
  }
  onConfirm = () => {
    let obj = {};
    if(this.state.uploded) {
      obj.shopPhotos = [this.state.data.shopPhoto];
    } 
    if(this.props.domain && this.state.show ) {
      obj.shopSrchName = this.state.data.domain.value;
      this.props.createShop(this.props.token, updateObject(this.state.finalData, obj));
    } else {
      this.setState({ error: 'Please select domain name that is available.' });
    }
  }
  render() {
    let loading = null;
    if(this.props.loading) {
      loading = <ErrorHandler error={<Spinner />} />
    }
    let error = null;
    if(this.state.error || this.props.error) {
      error = (
        <ErrorHandler
          error={this.state.error ? this.state.error : this.props.error}
          errorConformedhandler={this.errorConformedhandler}
        />
      );
    }
    let deliveryCharge = null;
    if(this.state.data.isStatic.value === 'true') {
      deliveryCharge = (
        <Aux>
          <Space />
          <Label>Delivery Charge</Label>
          {getInput(this.state.data.deliveryCharge ,this.inputChangedHandler)}
        </Aux>
      );
    } else {
      deliveryCharge = null;
    } 
    let icon = null;
    if(!this.props.domain && this.state.show) {
      icon = (
        <div className={module.Left} style={{ width: '8%' }} >
          <div className={module.Icon}>
            <CrossIcon />
          </div>
        </div>
      );
    } else if(this.props.domain && this.state.show) {
      icon = (
        <div className={module.Left} style={{ width: '8%' }} >
          <div className={module.Icon}>
            <CheckIcon />
          </div>
        </div>
      );
    }
    let ren = null;
    if(!this.state.next) {
      ren = (
        <Aux>
          <Space />
          {getInput(this.state.data.shopName, this.inputChangedHandler)}
          <Space />
          <Label>Shop Address</Label>
          {getInput(this.state.data.streetAdd ,this.inputChangedHandler)}
          {getInput(this.state.data.landmark ,this.inputChangedHandler)}
          <div className={module.Pair} >
            <div className={module.Left} >
              {getInput(this.state.data.city ,this.inputChangedHandler)}
            </div>
            <div className={module.Right} >
              {getInput(this.state.data.pincode ,this.inputChangedHandler)}
            </div>
          </div>
          {getSelect(this.state.data.state, states, this.onSelectHandler, 'state')}
          
          <div style={{ height: 'auto', width: '100%' }} >
            <Category
              shopCategories={this.state.data.shopCategories}
              category={this.state.data.category}
              shopCategoriesOptions={shopCategories}
              onSelectHandler={this.onSelectHandler}
              onIconClick={this.onIconClick}
              onRmvCatClick={this.onRmvCatClick}          
            />
          </div>
          <Space />
          <Label>Delivery Service</Label>
          {getSelect(this.state.data.isStatic, deliveryService, this.onSelectHandler, 'isStatic')}
          {deliveryCharge}
          <Space />
          <Label>Contact Number</Label>
          {getInput(this.state.data.phoneNumber ,this.inputChangedHandler)}
          <div style={{ height: 'auto', width: '100%' }} >
            <SocialMedia 
              socialLinks={this.state.data.socialLinks}
              linksType={this.state.data.linksType}
              linksTypeOptions={linksType}
              onSelectHandler={this.onSelectHandler}
              onIconClick={this.onIconClick}
              onRmvCatClick={this.onRmvCatClick} 
              link={this.state.data.link}
              inputChangedHandler={this.inputChangedHandler}
            />
          </div>
          <Space />
          <Label>Shop Description</Label>
          {getInput(this.state.data.description ,this.inputChangedHandler)}
          <div className={module.Button} >
            <div className={module.Space} ></div>
            <Button onClick={this.onClickNext} >Next</Button>
          </div>
        </Aux>
      );
    } else {
      ren = (
        <Aux> 
          <ImageUploader 
            src={this.state.image} 
            onFileSelect={this.onFileSelect}
            onUpload={this.onUpload}
            title='Shop Photo'
            />
          <div className={module.Domain} >
            <Space />
            <Space />
            <Label>Domain Name</Label>
            <Label>eg. applestore</Label>
            <div className={module.Pair} >
              <div className={module.Left} style={{ width: '85%' }} >
                {getInput(this.state.data.domain ,this.inputChangedHandler)}
              </div>
              {icon}
            </div>
            <div className={module.ButtonGroup} style={{ height: '75px' }} >
              <Button width='120px' onClick={this.onDomainCheck} >Check</Button>
            </div>
          </div>
          <div className={module.Buttons} >
            <div className={module.FinalButtons} >
              <div className={module.Back} >
                <Button width='120px' onClick={this.onBack} >Back</Button>
              </div>
              <div className={module.Confirm} >
                <Button width='120px' onClick={this.onConfirm} >Confirm</Button>
              </div>
            </div>
          </div>
        </Aux>
      );
    }
    return (
      <div className={module.Create} >
        {error}
        {loading}
        <div className={module.Header} >
          <div style={{ height: '25%' }} ></div>
          <div className={module.HeaderS} >
            <div className={module.Fuse} >Fuse</div>
            <div className={module.Logout} ><NavLink to='/auth/logout' >Logout</NavLink></div>
          </div>
        </div>
        <div className={module.Container} >
          <div className={module.Form} >
            {ren}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    token: state.auth.token,
    error: state.shop.error,
    loading: state.shop.loading,
    domain: state.shop.domain
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkShopDomain: (name) => dispatch(actions.checkShopDomain(name)),
    checkDomainFailConfirm: () => dispatch(actions.checkDomainFailConfirm()),
    createShop: (token, body) => dispatch(actions.createShop(token, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);