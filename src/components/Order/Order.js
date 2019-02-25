import React, { Component } from 'react';

import module from './Order.module.css';
import Aux from '../../hoc/Auxx/Auxx';
import {updateObject} from '../../shared/utility';
import ForwardArrow from '../UI/Icons/ForwardArrow/ForwardArrow';
import AmountIcon from '../UI/Icons/AmountIcon/AmountIcon';
import Contact from '../UI/Icons/Contact/Contact';
import Button from '../UI/Button/Button';
import Block from './Block/Block';
import PriceTag from '../UI/Icons/PriceTag/PriceTag';
import DeliveryRun from '../UI/Icons/DeliveryRun/DeliveryRun';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import DateTime from '../UI/DateTime/DateTime';
import { validateOrderData } from '../../shared/utility';
import CheckBox from '../UI/CheckBox/CheckBox';
import UpArrow from '../UI/Icons/UpArrow/UpArrow';
import DownArrow from '../UI/Icons/DownArrow/DownArrow';
import Item from './Item/Item';
import { dateTimeFormate } from '../../shared/utility';
import { convertAddress } from '../../shared/utility';
import Spinner from '../UI/Spinner/Spinner';
import DeliveryTimeLabel from './DeliveryTimeLabel/DeliveryTimeLabel';

class Order extends Component {
  state = {
    error: null,
    init: true,
    reject: false,
    delivered: false,
    accepting: false,
    cancelled: false,
    confirmed: false,
    show: false,  
    form: {
      expirationTime: {
        type: 'text',
        placeholder: 'Number of miniutes in which user can CANCEL this order!',
        value: '',
        name: 'expirationTime',
        autoComplete: 'off',
        required: true,
        width: '60%'
      },
      deliveryTime: {
        from: {
          year: 'year',
          month: 'month',
          day: 'day',
          hour: 'hour',
          miniutes: 'miniutes'
        },
        to: {
          year: 'year',
          month: 'month',
          day: 'day',
          hour: 'hour',
          miniutes: 'miniutes'
        }
      },
      custAcceptMsg: {
        type: 'text',
        placeholder: 'Short message to user(optional)',
        value: '',
        name: 'custAcceptMsg',
        maxLength: '200',
        autoComplete: 'off',
        required: false,
        width: '60%'
      },
      cancelOrder: false
    }
  }
  onClickCheck = (e) => {
    this.setState(prevState => {
      const updated = updateObject(this.state.form, { cancelOrder: !prevState.form.cancelOrder });
      return { form: updated };
    })
  }
  onConfirmHandler = () => {
    let valid = validateOrderData(this.state.form.deliveryTime, this.state.form.cancelOrder);
    if(valid.valid === true) {
      this.props.onConfirm(valid.msg);
    } else {
      this.setState({ error: valid.msg });
    }
  }
  onClickHandler = () => {
    this.setState(prevState => {
      return { show: !prevState.show }
    });
  }
  errorConformedhandler = () => {
    this.setState({ error: null });
    this.props.confirmedError();
  }
  onRejectHandler = () => {
    this.props.onReject();
  }
  onAcceptHandler = () => {
    this.setState({ init: false, accepting:true });
  }
  onBackHandler = () => {
    this.setState({ init: true, accepting: false });
  }
  onChangeHandler = (e) => {
    const updatedValue = updateObject(this.state.form[e.target.name], { value: e.target.value });
    const updateForm = updateObject(this.state.form, { [e.target.name]: updatedValue });
    this.setState({ form: updateForm });
  }
  onDateChange = (e, type) => {
    const updatedValue = updateObject(this.state.form.deliveryTime[type], { [e.target.name]: e.target.value });
    const updatedDeliveryTime = updateObject(this.state.form.deliveryTime, { [type]: updatedValue });
    const updateForm = updateObject(this.state.form, { deliveryTime: updatedDeliveryTime });
    this.setState({ form: updateForm });
  }
  componentDidMount() {
    const date = new Date();
    let from = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      miniutes: date.getMinutes()
    }
    const updatedFrom = updateObject(this.state.form.deliveryTime.from, from);
    const updatedDeliveryTime = updateObject(this.state.form.deliveryTime, { from: updatedFrom });
    const updatedForm = updateObject(this.state.form, { deliveryTime: updatedDeliveryTime });
    this.setState({ form: updatedForm });
    this.setState({ reject: this.props.reject, 
                    delivered: this.props.delivered,
                    cancelled: this.props.cancelled,
                    confirmed: this.props.confirmed,
                    init: this.props.init });
      
  }
  onChecked = (e) => {
    this.props.onDelivered();
  } 
  render() {
    let data = {
      name: this.props.name,
      address: convertAddress(this.props.address),
      time: dateTimeFormate(this.props.time),
      amout: this.props.amount,
      phoneNumber: this.props.phoneNumber,
      userMsg: this.props.userMsg,
      custAcceptMsg: this.props.custAcceptMsg,
      from: this.props.from,
      to: this.props.to,
      expirationTime: this.props.expirationTime,
      items: this.props.items,
      allowCancelOrder: this.props.allowCancelOrder
    }
    let error = null;
    if(this.state.error || this.props.error) {
      error = <ErrorHandler error={this.state.error ? this.state.error : this.props.error} errorConformedhandler={this.errorConformedhandler} />
    }
    let allowCancelOrder = (
        <div className={module.Msg} >
          <span>User <strong>{data.allowCancelOrder ? 'can' : 'can\'t'}</strong> cancel this order!</span>     
        </div>
      );
    let summary = null;
    if(this.state.confirmed) {
      summary = (
        <div className={module.Summary} >
          <DeliveryTimeLabel 
            fromTimeStamp={data.from}
            toTimeStamp={data.to}
          />
          <hr style={{ border: '1px solid #eee' }} />
          {allowCancelOrder}
        </div>
      );
    } 
    let ren = null;
    let header = (
      <Aux>
        <div className={module.Name} >
          <span>{data.name}</span>
        </div>
        <div className={module.Address} >
          <span className={module.Arrow} ><ForwardArrow /></span>
          <span className={module.Add} >{data.time}</span>
        </div>
        <div className={module.Address} >
          <span className={module.Arrow} ><ForwardArrow /></span>
          <span className={module.Add} >{data.address}</span>
        </div>
      </Aux>
    );
    let str = `Rs. ${data.amout}`;
    let info = (
      <Block 
        leftIcon1={<AmountIcon />}
        leftText1='Total Amount'
        rightIcon1={<ForwardArrow  />}
        rightText1={str}
        leftIcon2={<Contact />}
        leftText2='Contact No.'
        rightIcon2={<ForwardArrow  />}
        rightText2={data.phoneNumber}
      />
    );
    let control = null;
    let buttons = null;
    if(!this.state.cancelled) {
      buttons = (
        <div className={module.Buttons} >
          <div className={module.ButtonLeft} >
            <Button clicked={this.onAcceptHandler} disabled={this.state.cancelled} >Accept</Button>
          </div>
          <div className={module.ButtonRight} >
            <Button clicked={this.onRejectHandler} disabled={this.state.cancelled} >Reject</Button>
          </div>
        </div>
      );
    }
    let delivery = null;
    if(!this.state.delivered) {
      delivery = (
        <div className={module.Delivery} >
          <span>Delivered</span>
          <CheckBox 
            onChange={(e) => this.onChecked(e)}
            checked={this.state.delivered} /> 
        </div>
      );
    }
    if(this.state.init) {
      control = (
        <div>
          <div className={module.Info} >
            <Block 
              leftIcon1={<PriceTag />}
              leftText1='Status'
              rightIcon1={<ForwardArrow  />}
              rightText1={this.state.cancelled ? 'Cancelled' : 'Arrived'}
              leftIcon2={<DeliveryRun />}
              leftText2='Delivered'
              rightIcon2={<ForwardArrow  />}
              rightText2={this.state.delivered ? 'Yes' : 'No'}
              color1={ this.state.cancelled ? 'red' : 'green' }
              color2='red'
            />
          </div>
          {buttons}
          {summary}
        </div>
      );
    } else if(this.state.reject) {
      control = (
        <div className={module.Info} >
          <Block 
            leftIcon1={<PriceTag />}
            leftText1='Status'
            rightIcon1={<ForwardArrow  />}
            rightText1='Rejected'
            leftIcon2={<DeliveryRun />}
            leftText2='Delivered'
            rightIcon2={<ForwardArrow  />}
            rightText2={this.state.delivered ? 'Yes' : 'No'}
            color1='red'
            color2='red'
          />
        </div>
      );
    } else if(this.state.accepting) {
      control = (
        <div>
          <div className={module.Info} >
            <Block 
              leftIcon1={<PriceTag />}
              leftText1='Status'
              rightIcon1={<ForwardArrow  />}
              rightText1='Accepting'
              leftIcon2={<DeliveryRun />}
              leftText2='Delivered'
              rightIcon2={<ForwardArrow  />}
              rightText2={this.state.delivered ? 'Yes' : 'No'}
              color1='green'
              color2='red'
            />
          </div>
          <div className={module.Form} >
            <div className={module.DeliveryTime} >
              <div className={module.DateText} >Estimated delivery date</div>
              <div className={module.From} >
                <div className={module.TimeText} >From</div>
                <div className={module.FromDate} >
                  <DateTime 
                    onChange={(e) => this.onDateChange(e, 'from')}
                    yearName='year'
                    year={this.state.form.deliveryTime.from.year}
                    monthName='month'
                    month={this.state.form.deliveryTime.from.month}
                    dayName='day'
                    day={this.state.form.deliveryTime.from.day}
                    hourName='hour'
                    hour={this.state.form.deliveryTime.from.hour}
                    miniutesName='miniutes'
                    miniutes={this.state.form.deliveryTime.from.miniutes}
                    monthValue={this.state.form.deliveryTime.from.month} />
                </div>
              </div>
              <div className={module.To} >
                <div className={module.TimeText} >To</div>
                <div className={module.ToDate} >
                  <DateTime 
                    onChange={(e) => this.onDateChange(e, 'to')}
                    yearName='year'
                    year={this.state.form.deliveryTime.to.year}
                    monthName='month'
                    month={this.state.form.deliveryTime.to.month}
                    dayName='day'
                    day={this.state.form.deliveryTime.to.day}
                    hourName='hour'
                    hour={this.state.form.deliveryTime.to.hour}
                    miniutesName='miniutes'
                    miniutes={this.state.form.deliveryTime.to.miniutes}
                    monthValue={this.state.form.deliveryTime.to.month} />
                </div>
              </div>
            </div>
            <hr style={{ border: '1px solid #eee' }} />
            <div className={module.CustChoice} >
              <div className={module.CheckBox1} >
                <CheckBox 
                  onChange={this.onClickCheck}
                  checked={this.state.form.cancelOrder}
                />
              </div>
              <div className={module.Msg1} >
                Allow user to cancel this Order!
              </div>
            </div>
          </div>
          <div className={module.Buttons} >
            <div className={module.ButtonLeft} >
              <Button clicked={this.onConfirmHandler} >Confirm</Button>
            </div>
            <div className={module.ButtonRight} >
              <Button clicked={this.onBackHandler} >Back</Button>
            </div>
          </div>
        </div>
      );
    } else if(this.state.confirmed) {
      control = (
        <div>
          <div className={module.Info} >
            <Block 
              leftIcon1={<PriceTag />}
              leftText1='Status'
              rightIcon1={<ForwardArrow  />}
              rightText1='Confirmed'
              leftIcon2={<DeliveryRun />}
              leftText2='Delivered'
              rightIcon2={<ForwardArrow  />}
              rightText2={this.state.delivered ? 'Yes' : 'No'}
              color1='green'
              color2={this.state.delivered ? 'green' : 'red'}
            />
          </div>
          {delivery}
          {summary}
        </div>
      );
    } else if(this.state.cancelled) {
      control = (
        <Aux>
          {summary}
        </Aux>
      );
    }
    let footer = (
      <div>
        <DownArrow />
        <span>View order related information</span>
      </div>
    );
    if(this.state.show) {
      footer = (
        <div>
          <UpArrow />
          <span>Hide order related information</span>
        </div>
      );
    }
    let items = (
      <div className={module.NoItem} >No Item</div>
    );
    if(data.items) {
      items = data.items.map((item, i) => {
        return <Item 
                  key={i}
                  name={item.name}
                  category={item.category}
                  mUnit={item.mUnit}
                  mValue={item.mValue}
                  price={item.price}
                  quantity={item.quantity}
                  src={item.src} />
      });
    }
    let time = null;
    if(this.state.reject || this.state.delivered || this.state.cancelled || this.state.cancelled || this.state.confirmed) {
      time = <div className={module.TimeAt} >
        {dateTimeFormate(this.props.timeAt)}
      </div>
    }
    let content = null;
    if(this.props.loading) {
      content = <Spinner />;
    } else {
      content = (
        <Aux> 
          {error}
          <div className={module.Container} >
            {time}
            <div className={module.Header} >{header}</div>
            <div className={module.InfoH} >{info}</div>
            <div className={module.Divider} ></div>
            <div className={module.Control} >{control}</div>
          </div>
          {this.state.show ? items : null}
          <div className={module.Footer} onClick={this.onClickHandler} >
            {footer}
          </div>
        </Aux>
      );
    }
    ren = (
      <div className={module.Box} >
        {content}
      </div>
    );
    return (
      <Aux>
        {ren}
      </Aux>
    );
  }
}

export default Order;