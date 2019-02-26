import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './Profile.module.css';
import * as actions from '../../../store/actions/index';
import Label from '../../../components/Shop/Profile/Label/Label';
import Label1 from '../../../components/Shop/Label/Label';
import Space from '../../../components/Shop/Space/Space';
import Aux from '../../../hoc/Auxx/Auxx';
import Spinner from '../../../components/UI/SpinnerCenter/SpinnerCenter';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import LabelIn from '../../../components/Shop/Profile/LabelIn/LabelIn';
import EditModal from '../../../components/Shop/Profile/EditModal/EditModal';
import { getRSelect ,getRInput, updateObject, updateProfileValidator, getDistrictsOptions } from '../../../shared/utility';
import { ShopState } from '../../../shared/shopState';
import { shopCategories, linksType, deliveryService, states } from '../../../shared/option';
import ImageUploader from '../../../components/UI/ImageUploader/ImageUploader';
import Order from '../../../components/Shop/Profile/Orders/Orders';
import DeleteShop from '../../../components/Shop/Profile/DeleteShop/DeleteShop';
import ShopPhoto from '../../../assets/Images/ShopPhoto.png';
import AddIcon from '../../../components/UI/Icons/Add/Add';
import CrossIcon from '../../../components/UI/Icons/Cross/Cross';

class Profile extends Component {
  state = {
    show: false,
    edit: null,
    editError: null,
    ...ShopState,
    image: null,
    file: null,
    upload: false,
    districtsOp: [
      { name: 'district*', value: 'district*' }
    ]
  }
  onFileSelect = (e) => {
    if(e.target.files && e.target.files[0]) {
      let type = e.target.files[0].type;
      if(type === 'image/jpeg' || type === 'image/png') {
        this.setState({ file: e.target.files[0], image: URL.createObjectURL(e.target.files[0]) });
      } else {
        this.setState({ editError: 'Please select image file with jpeg/png extention' });
      }
    }
  }
  onUpload = () => {
    if(this.state.file) {
      const updatedshopPhoto = updateObject(this.state.shopPhoto, { name: this.state.file.name, type: this.state.file.type });
      this.setState({ uploded: true, shopPhoto: updatedshopPhoto, show: false, edit: null });
    } else {
      this.setState({ editError: 'Please Select Photo!' });
    }
  }
  getPopup = (fieldName, state, inputHandler, body, type) => {
    let inputs = (
      <Aux>
        <Space />
        <Label no >{fieldName}</Label>
        <div className={module.Input} >
          {getRInput(state, inputHandler)}
        </div>
      </Aux>
    )
    let compo = (
      <EditModal 
        type={this.state.edit}
        inputs={inputs}
        onClick={() => this.onUpdateClick(body, type)}
        error={this.state.editError}
      />
    );
    return compo;
  }
  componentDidMount() {
    this.props.fetchProfile(this.props.token);
  }
  onClosing = () => {
    this.setState({ show: false, edit: null });
  }
  onUpdateClick = (body, type) => {
    let valid;
    valid = updateProfileValidator(body, type);
    if(valid.valid) {
      this.props.updateProfile(this.props.token, valid.data);
      this.setState({ show: false, edit: null });
    } else {
      this.setState({ editError: valid.msg });
    }
  }
  onEditHandler = (type) => {
    let obj = {};
    if(type === 'shopAddress') {
      let streetAdd = updateObject(this.state.streetAdd, { value: this.props.profile.shopAddress[0].streetAdd });
      let landmark = updateObject(this.state.landmark, { value: this.props.profile.shopAddress[0].landmark });
      let pincode = updateObject(this.state.pincode, { value: this.props.profile.shopAddress[0].pincode });
      let state = updateObject(this.state.state, { value: this.props.profile.shopAddress[0].state });     
      let district = updateObject(this.state.district, { value: this.props.profile.shopAddress[0].city });
      let districtsOp = getDistrictsOptions(state.value);
      obj = {
        streetAdd, landmark, pincode, state, district, districtsOp
      };
    } else if(type === 'shopCategories') {
      obj = {
        shopCategories: this.props.profile.shopCategories
      };
    } else if(type === 'socialLinks') {
      obj = {
        socialLinks: this.props.profile.socialLinks
      }
    } else {
      const updatedValue = updateObject(this.state[type], { value: this.props.profile[type] });
      obj = {
        [type]: updatedValue
      };
    }
    this.setState({ show: true, edit: type, editError: null, ...obj });
  }
  onRmvCatClick = (field, value) => {
    let updatedArr;
    if(field === 'socialLinks') {
      updatedArr = this.state[field].filter(s => s.type !== value);
    } else if(field === 'shopCategories') {
      updatedArr = this.state[field].filter(cat => cat.category !== value);
    }
    this.setState({ [field]: updatedArr });
  }
  onIconClick = (field, obj, type) => {
    if(this.state[type].value === 'Category*') {
      this.setState({ editError: 'Please select valid option!' });
    } else if(type === 'linksType' && this.state.link.value === '') {
      this.setState({ editError: 'Please enter value in account name!' });
    } else {
      let updatedField = [...this.state[field]];
      if(type === 'category') {
        updatedField = updatedField.filter(cat => cat.category !== obj.category);
      } else if(type === 'linksType') {
        updatedField = updatedField.filter(lt => lt.type !== obj.type);
      }
      updatedField.push(obj);
      this.setState({ [field]: updatedField });
    }
  }
  onSelectHandler = (e, type) => {
    let field;
    field = updateObject(this.state[type], { value: e.target.value });
    let districtsOp = this.state.districtsOp;
    let district;
    if(type === 'state') {
      district = updateObject(this.state.district, { value: 'district*' });
      if(e.target.value !== 'state*') {
        districtsOp = getDistrictsOptions(e.target.value);
      } else {
        districtsOp = [
          { name: 'district*', value: 'district*' }
        ];
      }
    }
    if(type === 'state') {
      this.setState({ [type]: field, editError: null, districtsOp, district });
    } else {
      this.setState({ [type]: field, editError: null, districtsOp });
    }
  }
  inputChangedHandler = (e) => {
    this.setState({ editError: false });
    const updatedValue = updateObject(this.state[e.target.name], { value: e.target.value });
    this.setState({ [e.target.name]: updatedValue });
  }
  render() {
    let ren = null;
    let socialInfo = null;
    let modal = null;
    let compo = null;
    if(this.state.edit === 'shopName') {
      compo = this.getPopup('Shop Name', this.state.shopName, this.inputChangedHandler, { shopName: this.state.shopName }, 'shopName');
    } else if(this.state.edit === 'description') {
      compo = this.getPopup('Shop Description', this.state.description, this.inputChangedHandler, { description: this.state.description }, 'description');
    } else if(this.state.edit === 'deliveryCharge') {
      compo = this.getPopup('Delivery Charge', this.state.deliveryCharge, this.inputChangedHandler, { deliveryCharge: this.state.deliveryCharge }, 'deliveryCharge');
    } else if(this.state.edit === 'phoneNumber') {
      compo = this.getPopup('Phone Number', this.state.phoneNumber, this.inputChangedHandler, { phoneNumber: this.state.phoneNumber }, 'phoneNumber');
    } else if(this.state.edit === 'shopAddress') {
      let arr = [this.state.streetAdd, this.state.landmark, this.state.pincode];
      let inputs = arr.map((el, i) => {
        return (
          <Aux key={i} >
            <Space height='10px' />
            <Label no >{el.placeholder}</Label>
            <div className={module.Input} >
              {getRInput(el, this.inputChangedHandler)}
            </div>
          </Aux>
        );
      });
      inputs.push(
        <Aux key={'state'} >
          <Space height='10px' />
          <Label no >State</Label>
          <div className={module.Input} >
            {getRSelect(this.state.state, states, this.onSelectHandler, 'state')}
          </div>
        </Aux>
      );
      inputs.push(
        <Aux key={'district'} >
          <Space height='10px' />
          <Label no >District</Label>
          <div className={module.Input} >
            {getRSelect(this.state.district, this.state.districtsOp, this.onSelectHandler, 'district')}
          </div>
        </Aux>
      );
      let body = {
        streetAdd: this.state.streetAdd,
        landmark: this.state.landmark,
        district: this.state.district,
        pincode: this.state.pincode,
        state: this.state.state
      }
      compo = (
        <EditModal 
          type={this.state.edit}
          inputs={inputs}
          onClick={() => this.onUpdateClick(body, 'shopAddress')}
          error={this.state.editError}
        />
      );
    } else if(this.state.edit === 'shopPhotos') {
      compo = <ImageUploader
        src={this.state.image} 
        onFileSelect={this.onFileSelect}
        onUpload={this.onUpload}
        title='Shop Photo'
      />
    } else if(this.state.edit === 'isStatic') {
      let cat = (
        <div>
          <Space />
          <Label no >Delivery Service</Label>
          <div className={module.Input} >
            {getRSelect(this.state.isStatic, deliveryService, this.onSelectHandler, 'isStatic')}
          </div>
        </div>
      );
      compo = (
        <EditModal 
          type={this.state.edit}
          inputs={cat}
          onClick={() => this.onUpdateClick({ isStatic: this.state.isStatic  }, 'isStatic')}
          error={this.state.editError}
        />
      );
    } else if(this.state.edit === 'shopCategories') {
      let categoriesC =  this.state.shopCategories.map((c, i) => {
        return (
          <div className={module.Both1} key={i} >
            <div className={module.Left1} >
              {c.category}    
            </div>
            <div className={module.Right1} >
              <CrossIcon
                onClick={() => this.onRmvCatClick('shopCategories', c.category)}
              />
            </div>  
          </div>
        );
      });
      let cat = (
        <div className={module.Catbox} >
          <Label no>Shop Category</Label>
          <div className={module.Both} >
            <div className={module.Left} >
              {getRSelect(this.state.category, shopCategories, this.onSelectHandler, 'category')}
            </div>
            <div className={module.Right} >
              <AddIcon 
                onClick={() => this.onIconClick('shopCategories', { category: this.state.category.value }, 'category')}
              />
            </div>  
          </div>
          {categoriesC}
        </div>
      );
      compo = (
        <EditModal 
          type={this.state.edit}
          inputs={cat}
          onClick={() => this.onUpdateClick({ shopCategories: this.state.shopCategories }, 'shopCategories')}
          error={this.state.editError}
        />
      );
    } else if(this.state.edit === 'socialLinks') {
      let smC =  this.state.socialLinks.map((link, i) => {
        let value = `${link.type} : @${link.link}`;
        return (
          <div className={module.Both1} key={i} >
            <div className={module.Left1} >
              {value}    
            </div>
            <div className={module.Right1} >
              <CrossIcon
                onClick={() => this.onRmvCatClick('socialLinks', link.type)}
              />
            </div>  
          </div>
        );
      });
      let so = (
        <div className={module.SM} >
          <Label no>Social Media Information</Label>
          <div className={module.Both} >
            <div className={module.Left} >
              <div className={module.Input1} >
                {getRSelect(this.state.linksType, linksType, this.onSelectHandler, 'linksType')}
              </div>
              <div className={module.Input1} >
                {getRInput(this.state.link, this.inputChangedHandler)}
              </div>
            </div>
            <div className={module.Right} >
              <AddIcon
                onClick={() => this.onIconClick('socialLinks', { type: this.state.linksType.value, link: this.state.link.value }, 'linksType')}
              />
            </div>
          </div>
          {smC}
        </div>
      );
      compo = (
        <EditModal 
          type={this.state.edit}
          inputs={so}
          onClick={() => this.onUpdateClick({ socialLinks: this.state.socialLinks }, 'socialLinks')}
          error={this.state.editError}
        />
      );
    } else if(this.state.edit === 'timings') {
      compo = 'timings';
    } 
    if(this.props.profile) {
      if(this.props.profile.socialLinks.length > 0) {
        socialInfo = this.props.profile.socialLinks.map((s, i) => {
          return (
            <Aux key={i} >
              <Space height='5px' />
              <Label1>{s.type} :</Label1>
              <LabelIn>@{s.link}</LabelIn> 
            </Aux>
          );
        });
      }
      if(this.state.show) {
        modal = (
          <ErrorHandler 
            error={compo}
            errorConformedhandler={this.onClosing}
          />
        );
      } 
      let orders = null;
      if(!this.props.profile.isStatic) {
        orders = (
          <div style={{ height: 'auto' }} >
            <Order label='Total Orders' count={this.props.profile.orders.totalOrders} />
          </div>
        );
      }
      ren = (
        <Aux>
          {modal}
          <div className={module.CustProfile} >
            <div className={module.ProfileTitle} >
              Your Profile
            </div>
            <Space />
            <Label1>First Name</Label1>
            <LabelIn >{this.props.profile.cust.firstName}</LabelIn>
            <Space />
            <Label1>Last Name</Label1>
            <LabelIn >{this.props.profile.cust.lastName}</LabelIn>
            <Space />
            <Label1>Phone Number</Label1>
            <LabelIn >{this.props.profile.cust.phoneNumber}</LabelIn>
            <Space />
            <Label1>Email</Label1>
            <LabelIn >{this.props.profile.cust.email}</LabelIn>
            <Space />
          </div>
          <hr style={{ border: '1px solid #eee' }} />
          <div className={module.ShopProfile} >
            <div className={module.ProfileTitle} >
              Shop Profile
            </div>
            <Space />
            
            <div className={module.PhotoLabel} >
              <Label onClick={() => this.onEditHandler('shopPhotos')} >Shop Photo</Label>
            </div>
            <div className={module.Photo} >
              {/* eslint-disable-next-line  */}
              <img src={ShopPhoto} />
              {/* <img src={'https://as2.ftcdn.net/jpg/01/24/00/49/500_F_124004924_EjrA0S1BFvp3ScWCFMzRcgTnDuX3dGZh.jpg'} /> */}
            </div>
            <Space />
            
            <Label onClick={() => this.onEditHandler('shopName')} >Shop Name</Label>
            <Space height='5px' />
            <LabelIn>{this.props.profile.shopName}</LabelIn>
            <Space />
            
            <Label no >Domain Name</Label>
            <Space height='5px' />
            <LabelIn>https://thefuse.in/{this.props.profile.shopSrchName}</LabelIn>
            <Space />

            {orders}

            <Label onClick={() => this.onEditHandler('shopAddress')} >Shop Address</Label>
            <Space height='5px' />
            <Label1>Street Address :</Label1>
            <LabelIn>{this.props.profile.shopAddress[0].streetAdd}</LabelIn>
            <Space height='5px' />
            <Label1>Landmark :</Label1>
            <LabelIn>{this.props.profile.shopAddress[0].landmark}</LabelIn> 
            <Space height='5px' />
            <Label1>Pincode :</Label1>
            <LabelIn>{this.props.profile.shopAddress[0].pincode}</LabelIn>
            <Space height='5px' />
            <Label1>State :</Label1>
            <LabelIn>{this.props.profile.shopAddress[0].state}</LabelIn>
            <Space height='5px' />
            <Label1>District :</Label1>
            <LabelIn>{this.props.profile.shopAddress[0].city}</LabelIn>
            <Space height='5px' />
            <Label1>Country :</Label1>
            <LabelIn>{this.props.profile.shopAddress[0].country}</LabelIn> 

            <Space />
            <Label onClick={() => this.onEditHandler('phoneNumber')} >Phone Number</Label>
            <LabelIn>{this.props.profile.phoneNumber}</LabelIn>

            <Space />
            <Label onClick={() => this.onEditHandler('shopCategories')} >Shop Categories</Label>
            { this.props.profile.shopCategories.map((cat, i) => 
                <Aux key={i} >
                  <Space height='5px' />
                  <LabelIn>{cat.category}</LabelIn>
                </Aux>
            )}
            
            <Space />
            <Label onClick={() => this.onEditHandler('description')} >Shop Description</Label>
            <LabelIn>{this.props.profile.description}</LabelIn>

            <Space />
            <Label no={this.props.profile.isStatic ? false : true} onClick={() => this.onEditHandler('isStatic')} >Delivery Service</Label>
            <LabelIn>{this.props.profile.isStatic ? 'No' : 'Yes'}</LabelIn>
            
            {!this.props.profile.isStatic ? (<Aux>
              <Space />
              <Label onClick={() => this.onEditHandler('deliveryCharge')} >Delivery Charge</Label>
              <LabelIn>{this.props.profile.deliveryCharge}</LabelIn>
            </Aux>) : null }
            
            <Space />
            <Label onClick={() => this.onEditHandler('socialLinks')} >Social Media Information</Label>
            {socialInfo}
            
            <Space />
            <DeleteShop 
              onDeleteShop={() => this.props.deleteShop(this.props.token)}
            />
          </div>
        </Aux>
      );
    }
    if(this.props.loading) {
      ren = (
          <Spinner />
      );
    }
    if(this.props.error) {
      ren = (
        <ErrorHandler
          error={this.props.error}
          errorConformedhandler={this.props.confirmedError}
        />
      );
    }
    return (
      <div className={module.Profile} >
        {ren}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading: state.profile.loading,
    error: state.profile.error,
    profile: state.profile.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: (token) => dispatch(actions.fetchProfile(token)),
    confirmedError: () => dispatch(actions.confirmedError()),
    updateProfile: (token, body) => dispatch(actions.updateProfile(token, body)),
    deleteShop: (token) => dispatch(actions.deleteShop(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);