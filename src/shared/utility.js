import React from 'react';
import moment from 'moment';

import Input from '../components/Shop/Input/Input';
import Select from '../components/UI/Select/Select';
import { shopCategories, linksType } from './option';

export const updateObject = (oldObject, updatedproperties) => {
  return {
      ...oldObject,
      ...updatedproperties
  }
}

export const validateForm = (data, isSignup) => {
  if(data.email || data.phoneNumber)  {
    if(data.email) {
      if(data.email) {
        if(!(validateEmail(data.email))) {
          return { valid: false, msg: 'Invalid Email!' };
        }
      }
    }
    if(data.phoneNumber) {
      if(!(data.phoneNumber.length === 10)) {
        return { valid: false, msg: 'Invalid Mobile Number!' };
      }
      if(!(validatePhoneNumber(data.phoneNumber))) {
        return { valid: false, msg: 'Invalid Mobile Number!' };
      }
    }
    if(!(data.password.length >= 8)) {
      return { valid: false, msg: 'Password must ne larger than 7 character' };
    }
  } else {
    return { valid: false, msg: 'Please fill required fields' };
  }
  if(isSignup) {
    if(!(data.password.length >= 8 && data.confirmPassword.length >= 8)) {
      return { valid: false, msg: 'Password must ne larger than 7 character' };
    }
    if(!(2 <= data.firstName.length <= 60)) {
      return { valid: false, msg: 'First Name must contain 2 to 60 character!' };
    }
    if(!(2 <= data.lastName.length <= 120)) {
      return { valid: false, msg: 'First Name must contain 2 to 60 character!' };
    }
    if(!(data.password === data.confirmPassword)) {
      return { valid: false, msg: 'Please fill correct password and Confirm Password' };
    }
    if(!data.tac) {
      return { valid: false, msg: 'Please check terms and conditions!' };
    }
  }
  return { valid: true };
}

const validateEmail = (email) => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validatePhoneNumber = (phoneNumber) => {
  // eslint-disable-next-line
  let re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  return re.test(phoneNumber);
}

export const validateOrderData = (deliveryTime, expirationTime, custAcceptMsg) => {
  let miniutes = parseInt(expirationTime);
  let valid = true;
  let msg = null;
  if(deliveryTime.from.year === 'year' || deliveryTime.from.month === 'month' || deliveryTime.from.day === 'day' || deliveryTime.from.hour === 'hour' || deliveryTime.from.miniutes === 'miniutes' ||
     deliveryTime.to.year === 'year' || deliveryTime.to.month === 'month' || deliveryTime.to.day === 'day' || deliveryTime.to.hour === 'hour' || deliveryTime.to.miniutes === 'miniutes') {
    valid = false;
    msg = 'Please fill the date&time!';
    return { valid, msg };
  }
  if(isNaN(miniutes)) {
    valid = false;
    msg = 'Please enter valid miniutes!';
    return { valid, msg };
  }
  const date1 = new Date(deliveryTime.from.year, deliveryTime.from.month - 1, deliveryTime.from.day, deliveryTime.from.hour, deliveryTime.from.miniutes, 0, 0).getTime();
  const date2 = new Date(deliveryTime.to.year, deliveryTime.to.month - 1, deliveryTime.to.day, deliveryTime.to.hour, deliveryTime.to.miniutes, 0, 0).getTime();
  if(date1 < date2) {
    valid = valid && true;
    msg = { deliveryTime: { from: date1, to: date2 }, expirationTime: miniutes * 60000, custAcceptMsg: custAcceptMsg.value  };
    return { valid, msg };
  } else {
    valid = false;
    msg = 'Invalid date&time!';
    return { valid, msg };
  }
}

export const dateTimeFormate = (timeStamp) => {
  let timeStampInt = parseInt(timeStamp);
  return moment(timeStampInt).format('MMMM Do YYYY, h:mm a');
}

export const convertAddress = (address) => {
  return `${address.streetAdd}, ${address.landmark}, ${address.city}-${address.pincode} ${address.state}`;
}

export const checkwhiteSpaces = (str) => {
  for(let i=0; i<str.length; i++) {
    if(str[i] !== ' ') {
      return false;
    }
  }
  return true;
}

const forEmpty = (data) => {
  if(checkwhiteSpaces(data.value)) {
    return { valid: false, msg: `Please fill ${data.placeholder}.` };
  }
}

const checkLimit = (data) => {
  if((parseInt(data.maxLength) < data.value.length) || (data.value.length < parseInt(data.minLength))) {
    return { valid: false, msg: `${data.placeholder} must be between ${data.minLength} to ${data.maxLength} character.` };
  }
}

const checkForNumber = (str) => {
  // eslint-disable-next-line
  let re = /^\d+$/;
  return re.test(str);
}

export const validateCreateShop1 = (data) => {
  let finalData = {};
  let fields = [data.shopName, data.streetAdd, data.landmark, data.city, data.pincode, data.state, data.country, data.phoneNumber, data.description];
  for(let i=0; i<fields.length; i++) {
    if(forEmpty(fields[i])) {
      return forEmpty(fields[i]);
    }
    if(checkLimit(fields[i])) {
      return checkLimit(fields[i]);
    }
  }
  if(!checkForNumber(data.phoneNumber.value)) {
    return { valid: false, msg: `Please enter valid ${data.phoneNumber.placeholder}` };
  }
  if(!checkForNumber(data.pincode.value)) {
    return { valid: false, msg: `Please enter valid ${data.pincode.placeholder}` };
  }
  if(data.isStatic.value === 'true') {
    if(forEmpty(data.deliveryCharge)) {
      return forEmpty(data.deliveryCharge);
    }
    if(checkLimit(data.deliveryCharge)) {
      return checkLimit(data.deliveryCharge);
    }
    if(!checkForNumber(data.deliveryCharge.value)) {
      return { valid: false, msg: `Please enter valid delivery charge if any else 0` };
    }
  }
  if(data.shopCategories.length === 0) {
    return { valid: false, msg: `Please select shop category` };
  }
  finalData.shopName = data.shopName.value;
  if(data.isStatic.value === 'true') {
    finalData.deliveryCharge = data.deliveryCharge.value;
    finalData.isStatic = false;
  } else {
    finalData.isStatic = true;
  }
  finalData.phoneNumber = data.phoneNumber.value;
  finalData.description = data.description.value;
  finalData.shopAddress = {
    streetAdd: data.streetAdd.value,
    landmark: data.landmark.value,
    city: data.city.value,
    pincode: data.pincode.value,
    state: data.state.value,
    country: data.country.value
  }
  finalData.shopCategories = [];
  let shopcategories = {};
  shopCategories.forEach(cat => {
    shopcategories[cat.name] = 0;
  })
  data.shopCategories.forEach(c => {
    shopcategories[c.category] = shopcategories[c.category] + 1; 
  });
  finalData.shopCategories = [];
  Object.keys(shopcategories).forEach(c => {
    if(shopcategories[c] > 0) {
      finalData.shopCategories.push({ category: c });
    }
  });
  if(data.socialLinks.length > 0) {
    let linkstype = {};
    linksType.forEach(link => {
      linkstype[link.value] = 0;
    })
    finalData.socialLinks = [];
    data.socialLinks.forEach(l => {
      linkstype[l.type] = linkstype[l.type] + 1;
      if(linkstype[l.type] === 1) {
        finalData.socialLinks.push(l);
      } 
    });
  }
  return { valid: true, data: finalData };
}

export const updateProfileValidator = (data, type) => {
  let finalData = {};
  if(type === 'shopName' || type === 'deliveryCharge' || type === 'description' || type === 'phoneNumber') {
    if(type === 'phoneNumber') {
      data.phoneNumber.value = data.phoneNumber.value.toString();
      if(!checkForNumber(data.phoneNumber.value)) {
        return { valid: false, msg: `Please enter valid ${data.phoneNumber.placeholder}` };
      }
    }
    if(type === 'deliveryCharge') {
      data.deliveryCharge.value = data.deliveryCharge.value.toString();
      if(!checkForNumber(data.deliveryCharge.value)) {
        return { valid: false, msg: `Please enter valid delivery charge if any else 0` };
      }
    }
    if(forEmpty(data[type])) {
      return forEmpty(data[type]);
    }
    if(checkLimit(data[type])) {
      return checkLimit(data[type]);
    }
    finalData[type] = data[type].value;
  } 
  if(type === 'shopAddress') {
    let fields = [data.streetAdd, data.landmark, data.city, data.pincode, data.state, data.country];
    data.pincode.value = data.pincode.value.toString();
    for(let i=0; i<fields.length; i++) {
      if(forEmpty(fields[i])) {
        return forEmpty(fields[i]);
      }
      if(checkLimit(fields[i])) {
        return checkLimit(fields[i]);
      }
    }
    if(!checkForNumber(data.pincode.value)) {
      return { valid: false, msg: `Please enter valid ${data.pincode.placeholder}` };
    }
    let shopAddress = {};
    shopAddress.streetAdd = data.streetAdd.value;
    shopAddress.landmark = data.landmark.value;
    shopAddress.city = data.city.value;
    shopAddress.pincode = data.pincode.value;
    shopAddress.state = data.state.value;
    shopAddress.country = data.country.value;
    finalData.shopAddress = shopAddress;
  }
  if(type === 'shopCategories') {
    if(data.shopCategories.length === 0) {
      return { valid: false, msg: `Please select shop category` };
    }
    finalData.shopCategories = [];
    let shopcategories = {};
    shopCategories.forEach(cat => {
      shopcategories[cat.name] = 0;
    })
    data.shopCategories.forEach(c => {
      shopcategories[c.category] = shopcategories[c.category] + 1; 
    });
    finalData.shopCategories = [];
    Object.keys(shopcategories).forEach(c => {
      if(shopcategories[c] > 0) {
        finalData.shopCategories.push({ category: c });
      }
    });
  }
  if(type === 'socialLinks') {
    if(data.socialLinks.length > 0) {
      let linkstype = {};
      linksType.forEach(link => {
        linkstype[link.value] = 0;
      })
      finalData.socialLinks = [];
      data.socialLinks.forEach(l => {
        linkstype[l.type] = linkstype[l.type] + 1;
        if(linkstype[l.type] === 1) {
          finalData.socialLinks.push(l);
        } 
      });
    }
  }
  if(type === 'isStatic') {
    console.log(data);
    
    if(data.isStatic.value === 'true' || data.isStatic.value === true) {
      finalData.isStatic = false;
    } else {
      finalData.isStatic = true;
    }
  }
  return { valid: true, data: finalData };
}

export const getInput = (field, handler) => {
  return (
    <Input
      type={field.type}
      placeholder={field.placeholder}
      value={field.value}
      name={field.name}
      minLength={field.minLength}
      maxLength={field.maxLength}
      required={field.required}
      width={field.width}
      height={field.height}
      onChange={(e) => handler(e)}
    />
  );
}
export const getSelect = (field, options, handler, type) => {
  return (
    <Select 
      name={field.name}
      value={field.value}
      options={options}
      onChange={(e) => handler(e, type)}
      type={field.type}
    />
  );
}

export const itemValidator = (name, category, mUnit, mValue, description, price, photo) => {
  let finalData = {};
  let munit = {...mUnit};
  let mvalue = {...mValue};
  munit.placeholder = 'Item\'s Measure Unit';
  mvalue.placeholder = 'Measure Unit\'s value';
  let fields = [name, munit, mvalue,description, price];
  price.value = price.value.toString();
  for(let i=0; i<fields.length; i++) {
    if(forEmpty(fields[i])) {
      return forEmpty(fields[i]);
    }
    if(checkLimit(fields[i])) {
      return checkLimit(fields[i]);
    }
  }
  if(!checkForNumber(price.value)) {
    return { valid: false, msg: `Please enter valid Item Price` };
  }
  finalData.name = name.value;
  finalData.category = category;
  finalData.mUnit = mUnit.value;
  finalData.mValue = mValue.value;
  finalData.description = description.value;
  finalData.price = price.value;
  finalData.photo = photo;
  return { valid: true, data: finalData };
}

export const compareCategory = (a,b) => {
  if (a.category < b.category)
    return -1;
  if (a.category > b.category)
    return 1;
  return 0;
}
export const compareItem = (a,b) => {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}