import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import module from './Inventory.module.css';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxx/Auxx';
import Items from '../../../components/Shop/Inventory/Items/Items';
import Spinner from '../../../components/UI/SpinnerCenter/SpinnerCenter';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Button from '../../../components/UI/FormButton/Button';
import { updateObject, checkwhiteSpaces, itemValidator, mpValueValidator, compareCategory, compareItem } from '../../../shared/utility';
import  { mUnits  as mUnitsOptions } from '../../../shared/option';
import AddCat from '../../../components/Shop/Inventory/AddCat/AddCat';
import Item from '../../../components/Shop/Inventory/Item/Item';

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
      height: '35px',
      bradius: '4px'
    },
    mUnits: {
      name: 'mUnits',
      value: 'select*',
      type: 3,
      bradius: '4px'
    },
    mUnit: {
      type: 'text',
      placeholder: 'eg. size, kilo etc',
      value: '',
      name: 'mUnit',
      minLength: '1',
      maxLength: '8',
      required: true,
      width: '80%',
      height: '35px',
      bradius: '4px'
    },
    mValue: {
      type: 'text',
      placeholder: 'eg. 0.5, 1 etc.',
      value: '',
      name: 'mValue',
      minLength: '1',
      maxLength: '10',
      required: true,
      width: '95%',
      height: '35px',
      bradius: '4px'
    },
    price: {
      type: 'tel',
      placeholder: 'Item Price',
      value: '',
      name: 'price',
      minLength: '1',
      maxLength: '10',
      required: true,
      width: '80%',
      height: '35px',
      bradius: '4px'
    },
    description: {
      type: 'text',
      placeholder: 'Item Description',
      value: '',
      name: 'description',
      minLength: '0',
      maxLength: '350',
      required: false,
      width: '80%',
      height: '35px',
      bradius: '4px'
    },
    outOfStock: false,
    mpValues: [],
    itemID: null,
    itemCategorie: null,
    itemPhoto: null,
  }
  onToggleClick = () => {
    this.setState(prevState => {
      return { outOfStock: !prevState.outOfStock };
    });
  }
  onPhotoUploaded = (data) => {
    this.setState({ itemPhoto: data });
  }
  onAddValue = () => {
    let mValue = updateObject(this.state.mValue, { value: '' });
    let price = updateObject(this.state.price, { value: '' });
    const msValue = this.state.mValue.value;
    const pValue = this.state.price.value;
    const valid = mpValueValidator(this.state.mValue, this.state.price); 
    if(valid.valid) {
      let mpValues = [...this.state.mpValues];
      mpValues = mpValues.filter(v => v.mValue !== msValue);
      mpValues.push({ mValue: msValue, price: pValue });
      this.setState({ mpValues, mValue, price });
    } else {
      this.setState({ error: valid.msg });
    }
  }
  onRmvValue = (value) => {
    this.setState(prevState => {
      let mpValues = [...prevState.mpValues];
      mpValues = mpValues.filter(v => v.mValue !== value);
      return { mpValues };
    });
  }
  resSet = () => {
    let name = updateObject(this.state.name, { value: '' });
    let mUnit = updateObject(this.state.mUnit, { value: '' });
    let mUnits = updateObject(this.state.mUnits, { value: 'select*' });
    let mValue = updateObject(this.state.mValue, { value: '' });
    let price = updateObject(this.state.price, { value: '' });  
    let description = updateObject(this.state.description, { value: '' });
    let mpValues = [];
    this.setState({ icon: false, item: false, name, mUnit, mUnits, mValue, mpValues, price, description, itemPhoto: null, outOfStock: false });
  }
  onItemHandler = (type) => {
    if(!this.state.itemPhoto) {
      this.setState({ error: 'Please Upload Photo!' });
    } else {
      const r = itemValidator(this.state.name, this.state.itemCategorie, this.state.mUnit, this.state.mUnits, this.state.mpValues,this.state.description, this.state.itemPhoto, this.state.outOfStock);
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
    let mUnits;
    let flag = false;
    for(let i=0; i<mUnitsOptions.length; i++) {
      if(mUnitsOptions[i].value === data.mUnit) {
        flag = true;
        break;
      }
    }
    if(flag) {
      mUnits = updateObject(this.state.mUnits, { value: data.mUnit });
      mUnit = updateObject(this.state.mUnit, { value: '' });
    } else {
      mUnits = updateObject(this.state.mUnits, { value: 'other' });
      mUnit = updateObject(this.state.mUnit, { value: data.mUnit });
    }
    let mpValues;
    mpValues = data.mpValues;
    let description = updateObject(this.state.description, { value: data.description });
    const outOfStock = data.outOfStock ? true : false;
    this.setState({ item: true, itemID: data._id, name, mUnit, mUnits, mpValues, description, itemPhoto: data.photo, itemCategorie: data.category, error: null, outOfStock });
  }
  onIconClick = (category) => {
    this.setState({ icon: true, itemCategorie: category, error: null, mpValues: [] });
  }
  onAddCatClick = () => {
    this.setState({ cat: true, error: null });
  }
  onRemoveCatClick = (id) => {
    this.props.updateInv(this.props.token, { categoryID: id}, '3');
  } 
  onClear = (type) => {
    this.setState({ [type]: false, error: null });
    this.resSet();
  }
  componentDidMount() {
    this.props.fetchInv(this.props.token);
  }
  inputChangeHandler = (e) => {
    const updatedField = updateObject(this.state[e.target.name], { value: e.target.value });
    this.setState({ [e.target.name]: updatedField, error: null });
  }
  onSelectHandler = (e, type) => {
    let field;
    field = updateObject(this.state[type], { value: e.target.value });
    this.setState({ [type]: field, error: null });
  }
  render() {
    let error = null;
    if(this.props.error) {
      error = ( <ErrorHandler error={this.props.error} errorConformedhandler={this.props.errorConfirmed}/> );
    }

    let show = null;
    if(this.state.cat) {
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
    if(this.state.item) {
      ren = (
        <Item
          update
          updateButton='Update Item'
          deleteButton='Delete Item'
          name={this.state.name}
          mUnit={this.state.mUnit}
          mUnits={this.state.mUnits}
          mValue={this.state.mValue}
          price={this.state.price}
          description={this.state.description}
          inputHandler={this.inputChangeHandler}
          selectHandler={this.onSelectHandler}
          src={this.state.itemPhoto}
          error={this.state.error}
          updateButtonHandler={() => this.onItemHandler('5')}
          deleteButtonHandler={() => this.onItemHandler('4')}
          onAddValue={this.onAddValue}
          mpValues={this.state.mpValues}
          onRmvValue={this.onRmvValue}
          onBack={this.onClear}
          onPhotoUploaded={this.onPhotoUploaded}
          outOfStock={this.state.outOfStock}
          onToggleClick={this.onToggleClick}
        />
      );
    } else if(this.state.icon) {
      ren = (
        <Item
          fianlButton='Add Item'
          finalButtonHandler={() => this.onItemHandler('2')}
          name={this.state.name}
          mUnit={this.state.mUnit}
          mUnits={this.state.mUnits}
          mValue={this.state.mValue}
          price={this.state.price}
          description={this.state.description}
          inputHandler={this.inputChangeHandler}
          selectHandler={this.onSelectHandler}
          error={this.state.error}
          onAddValue={this.onAddValue}
          mpValues={this.state.mpValues}
          onRmvValue={this.onRmvValue}
          onBack={this.onClear}
          onPhotoUploaded={this.onPhotoUploaded}
          outOfStock={this.state.outOfStock}
          onToggleClick={this.onToggleClick}
        />
      );
    } 
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