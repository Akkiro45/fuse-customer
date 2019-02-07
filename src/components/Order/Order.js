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
import Input from '../UI/Input/Input';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import DateTime from '../UI/DateTime/DateTime';
import ToolTip from '../UI/ToolTip/ToolTip';
import { validateOrderData } from '../../shared/utility';
import CheckBox from '../UI/CheckBox/CheckBox';
import UpArrow from '../UI/Icons/UpArrow/UpArrow';
import DownArrow from '../UI/Icons/DownArrow/DownArrow';
import Item from './Item/Item';
import { dateTimeFormate } from '../../shared/utility';
import { convertAddress } from '../../shared/utility';
import Spinner from '../UI/Spinner/Spinner';

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
      }
    }
  }
  onConfirmHandler = () => {
    let valid = validateOrderData(this.state.form.deliveryTime, this.state.form.expirationTime.value, this.state.form.custAcceptMsg);
    if(valid.valid === true) {
      // this.setState({ confirmed: true, error: null, accepting: false, from: valid.msg.from, to: valid.msg.to });
      // console.log(valid.msg);
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
    // this.setState({ init: false, reject: true, delivered: false });
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
    // this.setState({ delivered: true });
    this.props.onDelivered();
  } 
  render() {
    
    // let data = {
    //   name: 'Dharmik Patel',
    //   address: 'Gurudatt Society, Andheri East, Mumbai-400099 skldkdkaskldhnaklsfkhifhlashdklsnaklaslhfihdasklfaslhflashlfhdklfkljfkhdklfnklsdfkldklfdklfkldflhsldhfildhfkl',
    //   time: '2017 oct 10 10:45:00',
    //   amout: '2373',
    //   phoneNumber: '8898456787',
    //   userMsg: 'tshks jsdjljad adj;aojedwe qwo;ejojqwoejaw sdjdojasd;osd aosdjoajsdjsoajls kjklwasj asnlaskl jsodjo;as asojasd;j sdlasdlmndslsedk',
    //   custAcceptMsg: 'skas asnndklanskldnsdl;awd awemnl;aw;e;lwmelwmle l hsdkklsd sdnksndksnd sdjsjd;lsd adojas;djla',
    //   from: 'date1',
    //   to: 'date2',
    //   expirationTime: '67',
    //   items: [
    //     { name: 'Milk', category: 'Dairy', mUnit: 'Liter', price: '20', quantity: 2, src:'./Img/1.jpeg' },
    //     { name: 'Shirt', category: 'Cloth', mUnit: 'quantity', price: '300', quantity: 1, src:'./Img/2.jpeg' },
    //     { name: 'Suger', category: 'grocery', mUnit: 'Kilo', price: '80', quantity: 4, src:'./Img/3.jpeg' }
    //   ]
    // }
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
      items: this.props.items
    }
    let error = null;
    if(this.state.error || this.props.error) {
      error = <ErrorHandler error={this.state.error ? this.state.error : this.props.error} errorConformedhandler={this.errorConformedhandler} />
    }
    let userMsg = null;
    if(data.userMsg) {
      userMsg = (
        <div className={module.Msg} >
          <hr />
          <span>User Message was <strong>"{data.userMsg}"</strong></span>     
        </div>
      );
    }
    let custMsg = null;
    if(data.custAcceptMsg && data.custAcceptMsg !== ' ') {
      custMsg = (
        <div className={module.Msg} >
          <hr />
          <span>Your Message was <strong>"{data.custAcceptMsg}"</strong></span>     
        </div>
      );
    }
    let summary = null;
    if(this.state.confirmed) {
      summary = (
        <div className={module.Summary} >
          <span>
            Expected delivery from <strong>{dateTimeFormate(data.from)}</strong> to <strong>{dateTimeFormate(data.to)}</strong>
          </span>
          <hr />
          <span>
            Number Of Minutes <strong>{data.expirationTime}</strong>
          </span>
          {custMsg}
          {userMsg}
        </div>
      );
    }  
    if(this.state.cancelled && data.userMsg ) {
      summary = <div className={module.Summary} >{userMsg}</div>;
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
        leftText1='Total Amout'
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
            <hr style={{ color: '#006989' }} />
            <ToolTip msg={this.state.form.expirationTime.placeholder} >
              <div className={module.AlignInput} >
                <Input 
                  Height
                  width={this.state.form.expirationTime.width}
                  type={this.state.form.expirationTime.type}
                  placeholder={this.state.form.expirationTime.placeholder}
                  value={this.state.form.expirationTime.value}
                  onChange={e => this.onChangeHandler(e)}
                  name={this.state.form.expirationTime.name}
                  required={this.state.form.expirationTime.required}
                  autoComplete={this.state.form.expirationTime.autoComplete}
                />
              </div>
            </ToolTip>
            <hr style={{ color: '#006989' }} />
            <div className={module.AlignInput} >
              <Input 
                Height
                width={this.state.form.custAcceptMsg.width}
                type={this.state.form.custAcceptMsg.type}
                placeholder={this.state.form.custAcceptMsg.placeholder}
                value={this.state.form.custAcceptMsg.value}
                onChange={e => this.onChangeHandler(e)}
                name={this.state.form.custAcceptMsg.name}
                maxLength={this.state.form.custAcceptMsg.maxLength}
                required={this.state.form.custAcceptMsg.required}
                autoComplete={this.state.form.custAcceptMsg.autoComplete}
              />
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
      items = data.items.map(item => {
        return <Item 
                  key={item.name + item.category}
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
            <div className={module.Info} >{info}</div>
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
    // ren = (
    //   <div className={module.Box} >
    //     {error}
    //     <div className={module.Container} >
    //       <div className={module.Header} >{header}</div>
    //       <div className={module.Info} >{info}</div>
    //       <div className={module.Divider} ></div>
    //       <div className={module.Control} >{control}</div>
    //     </div>
    //     {this.state.show ? items : null}
    //     <div className={module.Footer} onClick={this.onClickHandler} >
    //       {footer}
    //     </div>
    //   </div>
    // );
    ren = (
      <div className={module.Box} >
        {content}
      </div>
    );
    // console.log('------------------');
    
    // console.log('init: ', this.state.init);
    // console.log('reject', this.state.reject);
    // console.log('cancelled: ', this.state.cancelled);
    // console.log('confirmed: ', this.state.confirmed);
    // console.log('accepting: ', this.state.accepting);
    // console.log('delivered: ', this.state.delivered);
    return (
      <Aux>
        {ren}
      </Aux>
    );
  }
}

export default Order;