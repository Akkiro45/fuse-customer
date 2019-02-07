import React from 'react';
import moment from 'moment';

import module from './DateTime.module.css';

const dateTime = (props) => {
  let temp;
  let year1 = new Date().getFullYear();
  let year2 = new Date().getFullYear() + 1;
  let hour = [];
  let miniutes = [];
  let days = [];
  let maxDays = 31;
  let months = [];
  let monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let style = {};
  if(props.monthValue === 'month') {
    style.cursor = 'not-allowed';
  } else {
    if(props.monthValue === '4' || props.monthValue === '6' || props.monthValue === '9' || props.monthValue === '11') 
      maxDays = 30;
    else if(props.monthValue === '2') {
      maxDays = 28;
      if(moment([`${props.year}`]).isLeapYear()) {
        maxDays = 29;
      }
    }
    else maxDays = 31;
  }
  for(let i=1; i<=24; i++) {
    if(i<10) temp = '0' + i;
    else temp = i;
    hour.push(<option key={i} value={i} >{temp}</option>);
  }
  for(let i=0; i<=60; i++) {
    if(i<10) temp = '0' + i;
    else temp = i;
    miniutes.push(<option key={i} value={i} >{temp}</option>);
  }
  for(let i=1; i<=maxDays; i++) {
    days.push(<option key={i} value={i} >{i}</option>);
  }
  for(let i=0; i<12; i++) {
    months.push(<option key={i} value={i + 1} >{monthsName[i]}</option>)
  }
  return (
    <div className={module.DateTime} >
      <select value={props.year} name={props.yearName} onChange={props.onChange} >
        <option value='year' >Year</option>
        <option value={year1} >{year1}</option>
        <option value={year2} >{year2}</option>
      </select>
      <select value={props.month} name={props.monthName} onChange={props.onChange} >
        <option value='month' >Month</option>
        {months}
      </select>
      <select disabled={props.monthValue === 'month'} style={style} value={props.day} name={props.dayName} onChange={props.onChange} >
        <option value='day' >Day</option>
        {days}
      </select>
      <select value={props.hour} name={props.hourName} onChange={props.onChange} >
        <option value='hour' >Hour</option>
        {hour}
      </select>
      <span> : </span>
      <select value={props.miniutes} name={props.miniutesName} onChange={props.onChange} >
        <option value='miniutes' >Miniutes</option>
        {miniutes}
      </select>
    </div>
  );
}

export default dateTime;