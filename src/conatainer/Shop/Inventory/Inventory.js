import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import module from './Inventory.module.css';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxx/Auxx';
import Items from '../../../components/Shop/Inventory/Items/Items';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Spinner from '../../../components/UI/SpinnerCenter/SpinnerCenter';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Button from '../../../components/UI/FormButton/Button';
import { updateObject, checkwhiteSpaces, itemValidator, compareCategory, compareItem } from '../../../shared/utility';

import AddCat from '../../../components/Shop/Inventory/AddCat/AddCat';
import ItemInfo from '../../../components/Shop/Inventory/ItemInfo/ItemInfo';

class Inventory extends Component {
  state = {
    item: false,
    icon: false,
    cat: false,
    error: null,
    category: {
      type: 'text',
      placeholder: 'Category',
      value: '',
      name: 'category',
      minLength: '1',
      maxLength: '250',
      required: true,
      width: '100%',
      height: '35px'
    },
    name: {
      type: 'text',
      placeholder: 'Item name',
      value: '',
      name: 'name',
      minLength: '1',
      maxLength: '250',
      required: true,
      width: '80%',
      height: '35px'
    },
    mUnit: {
      type: 'text',
      placeholder: 'eg. size, kilo etc',
      value: '',
      name: 'mUnit',
      minLength: '1',
      maxLength: '250',
      required: true,
      width: '80%',
      height: '35px'
    },
    mValue: {
      type: 'text',
      placeholder: 'eg. 0.5, 1 etc.',
      value: '',
      name: 'mValue',
      minLength: '1',
      maxLength: '10',
      required: true,
      width: '80%',
      height: '35px'
    },
    price: {
      type: 'tel',
      placeholder: 'Item Price',
      value: '',
      name: 'price',
      minLength: '1',
      maxLength: '250',
      required: true,
      width: '80%',
      height: '35px'
    },
    description: {
      type: 'text',
      placeholder: 'Item Description',
      value: '',
      name: 'description',
      minLength: '1',
      maxLength: '350',
      required: true,
      width: '80%',
      height: '35px'
    },
    itemID: null,
    itemCategorie: null,
    file: null,
    image: null,
    itemPhoto: null,
    uploded: false
  }
  resSet = () => {
    let name = updateObject(this.state.name, { value: '' });
    let mUnit = updateObject(this.state.mUnit, { value: '' });
    let mValue = updateObject(this.state.mValue, { value: '' });
    let price = updateObject(this.state.price, { value: '' });
    let description = updateObject(this.state.description, { value: '' });
    this.setState({ icon: false, item: false, name, mUnit, mValue, price, description, file: null, image: null, itemPhoto: null, uploded: false });
  }
  onFileSelect = (e) => {
    if(e.target.files && e.target.files[0]) {
      let type = e.target.files[0].type;
      if(type === 'image/jpeg' || type === 'image/png') {
        this.setState({ file: e.target.files[0], image: URL.createObjectURL(e.target.files[0]), error: null });
      } else {
        this.setState({ error: 'Please select image file with jpeg/png extention' });
      }
    }
  }
  onUpload = () => {
    if(this.state.file) {
      console.log('Uploded');
      const updatedItemPhoto = updateObject(this.state.itemPhoto, { name: this.state.file.name, type: this.state.file.type });
      // const updateData = updateObject(this.state.data, { itemPhoto: updatedItemPhoto });
      this.setState({ uploded: true, itemPhoto: updatedItemPhoto, error: null });
    } else {
      this.setState({ error: 'Please Select Photo!' });
    }
  }
  onItemHandler = (type) => {
    if(!this.state.uploded) {
      this.setState({ error: 'Please Upload Photo!' });
    } else {
      const r = itemValidator(this.state.name, this.state.itemCategorie, this.state.mUnit, this.state.mValue,this.state.description, this.state.price, this.state.itemPhoto);
      if(r.valid === false) {
        this.setState({ error: r.msg });
      } else {
        if(type === '2') {
          this.props.updateInv(this.props.token, { item: r.data }, type);
        } else if(type === '5') {
          this.props.updateInv(this.props.token, { item: r.data, itemID: this.state.itemID  }, type);
        } else if(type === '4') {
          this.props.updateInv(this.props.token, { itemID: this.state.itemID  }, type);
        }
        this.resSet();
        // this.setState({ icon: false, item: false });
      }
    }
  }
  onAddCategoryHandler = () => {
    if(!checkwhiteSpaces(this.state.category.value)) {
      this.props.updateInv(this.props.token, { category: this.state.category.value }, '1');
      const updatedField = updateObject(this.state.category, { value: '' });
      this.setState({ error: null, cat: false, category: updatedField });
    } else {
      this.setState({ error: 'Please Enter valid input!' });
    }
  } 
  onItemClick = (data) => {
    let name = updateObject(this.state.name, { value: data.name });
    let mUnit = updateObject(this.state.mUnit, { value: data.mUnit });
    let mValue = updateObject(this.state.mValue, { value: data.mValue });
    let price = updateObject(this.state.price, { value: data.price });
    let description = updateObject(this.state.description, { value: data.description });
    this.setState({ item: true, itemID: data._id, name, mUnit, mValue,price, description, itemPhoto: data.photo, uploded: true, itemCategorie: data.category });
  }
  onIconClick = (category) => {
    this.setState({ icon: true, itemCategorie: category });
  }
  onAddCatClick = () => {
    this.setState({ cat: true });
  }
  onRemoveCatClick = (id) => {
    this.props.updateInv(this.props.token, { categoryID: id}, '3');
  } 
  onClear = (type) => {
    this.setState({ [type]: false });
    this.resSet();
  }
  componentDidMount() {
    this.props.fetchInv(this.props.token);
  }
  inputChangeHandler = (e) => {
    const updatedField = updateObject(this.state[e.target.name], { value: e.target.value });
    this.setState({ [e.target.name]: updatedField, error: null });
  }
  render() {
    let error = null;
    if(this.props.error) {
      error = ( <ErrorHandler error={this.props.error} errorConformedhandler={this.props.errorConfirmed}/> );
    }

    let show = null;
    if(this.state.item) {
      show = <ErrorHandler 
        error={
          <ItemInfo 
            update
            title='Update Item'
            updateButton='Update Item'
            deleteButton='Delete Item'
            name={this.state.name}
            mUnit={this.state.mUnit}
            mValue={this.state.mValue}
            price={this.state.price}
            description={this.state.description}
            inputHandler={this.inputChangeHandler}
            src={this.state.image}
            onFileSelect={this.onFileSelect}
            onUpload={this.onUpload}
            error={this.state.error}
            updateButtonHandler={() => this.onItemHandler('5')}
            deleteButtonHandler={() => this.onItemHandler('4')}
          />
        } 
        errorConformedhandler={() => this.onClear('item')} />
    } else if(this.state.cat) {
      show = <ErrorHandler 
        error={
          <AddCat 
            category={this.state.category}
            handler={this.inputChangeHandler}
            onClick={this.onAddCategoryHandler}
            error={this.state.error}
          />
        } 
        errorConformedhandler={() => this.onClear('cat')} />
    } else if(this.state.icon) {
      show = <ErrorHandler 
        error={
          <ItemInfo 
            title='Add New Item'
            fianlButton='Add Item'
            finalButtonHandler={() => this.onItemHandler('2')}
            name={this.state.name}
            mUnit={this.state.mUnit}
            mValue={this.state.mValue}
            price={this.state.price}
            description={this.state.description}
            inputHandler={this.inputChangeHandler}
            src={this.state.image}
            onFileSelect={this.onFileSelect}
            onUpload={this.onUpload}
            error={this.state.error}
          />
        }
        errorConformedhandler={() => this.onClear('icon')} />
    } 
    let items = (
      <div className={module.Empty} >
        Empty Inventory!
      </div>
    );
    if(this.props.itemCategories) {
      if(this.props.itemCategories.length > 0) {
        this.props.itemCategories.sort(compareCategory);
        let itms;
        items = this.props.itemCategories.map((cat, index) => {
          itms = this.props.items.filter(i => i.category === cat.category);
          itms.sort(compareItem);
          return (
            <Items 
              category={cat.category} 
              onIconClick={() => this.onIconClick(cat.category)}  
              onItemClick={this.onItemClick}
              onRemoveCat={() => this.onRemoveCatClick(cat._id)}
              items={itms}
              key={index}  
          />
          );
        })
      }
    }
    let ren = (
      <Aux >
        {show}
        <div className={module.AddCat} >
          <div className={module.AddCatButton} >
            <Button width='150px' onClick={this.onAddCatClick} >Add Category</Button>
          </div>
        </div>
        <div className={module.Container} >
          {error}
          {this.props.loading ? null: items}
        </div>
      </Aux>
    );
    if(this.props.loading) {
      ren = ( 
          <Spinner /> 
      );
    }
    return (
      <div className={module.Inventory} >
        {ren}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    items: state.inv.items,
    itemCategories: state.inv.itemCategories,
    loading: state.inv.loading,
    error: state.inv.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInv: (token) => dispatch(actions.fetchInv(token)),
    errorConfirmed: () => dispatch(actions.errorConfirmed()),
    updateInv: (token, body, type) => dispatch(actions.updateInv(token, body, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);