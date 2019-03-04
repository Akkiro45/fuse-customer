import React, { Component } from 'react';
import { connect } from 'react-redux';

import module from './Orders.module.css';
import * as actions from '../../../store/actions/index';
import Order from '../../../components/Order/Order';
import Select from '../../../components/UI/Select/Select';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class Orders extends Component {
  state = {
    filter: '2',
    str: null,
    loading: false,
    error: null,
    orders: null,
    pageNumber: 1,
    pageSize: 20,
    done: false
  }
  onChangeFilter = (e) => {
    this.setState({ filter: e.target.value, pageNumber: 1 });
    if(e.target.value === '2') this.setState({ str: null });
    else if(e.target.value === '3') this.setState({ str: 'Cancelled' });
    else if(e.target.value === '4') this.setState({ str: 'Accepted' });
    else if(e.target.value === '5') this.setState({ str: 'Rejected' });
    else if(e.target.value === '6') this.setState({ str: 'Delivered' });
    else if(e.target.value === '7') this.setState({ str: 'Not Delivered' });
    else if(e.target.value === '8') this.setState({ str: null });
    this.props.fetchOrders(1, this.state.pageSize, parseInt(e.target.value), this.props.token);
  }
  componentDidMount() {
      this.props.fetchOrders(this.state.pageNumber, this.state.pageSize, 2, this.props.token);
  }
  onRefresh = () => {
    this.props.fetchOrders(1, this.state.pageSize, parseInt(this.state.filter), this.props.token);
    this.setState({ pageNumber: 1 });
  }
  onReject = (orderID) => {
    this.props.onUpdateOrder(this.props.token, { orderID, type: 5 });
  }
  onConfirm = (data, orderID) => {
    this.props.onUpdateOrder(this.props.token, { ...data, orderID, type: 4 });
  }
  onDelivered = (orderID) => {
    this.props.onUpdateOrder(this.props.token, { orderID, type: 6 });
  }
  onNotDelivered = (orderID) => {
    this.props.onUpdateOrder(this.props.token, { orderID, type: 7 });
  }
  getLoading = (id) => {
    if(this.props.current === id && this.props.updateLoading) {
      return true;
    } else {
      return false;
    }
  }
  getError = (id) => {
    if(this.props.current === id && this.props.updateError) {
      return this.props.updateError;
    } else {
      return null;
    }
  }
  onScrollHandle = (e) => {
    const bottom = parseInt(e.target.scrollHeight - e.target.scrollTop) === parseInt(e.target.clientHeight);
    if(bottom && !this.props.done[parseInt(this.state.filter) + 2]) {
      this.props.fetchMoreOrders(this.state.pageNumber + 1, this.state.pageSize, parseInt(this.state.filter), this.props.token);
      this.setState(prevState => {
        return { pageNumber: prevState.pageNumber + 1 }
      });
    }
    if(this.props.done[parseInt(this.state.filter) + 2]) {
      this.setState({ done: true });
    }
  }
  render() {
    let options = [
      { name: 'Pending', value: 2 },
      { name: 'Cancelled', value: 3 },
      { name: 'Accepted', value: 4 },
      { name: 'Rejected', value: 5 },
      { name: 'Delivered', value: 6 },
      { name: 'Not Delivered', value: 7 },
      { name: 'All', value: 8 }
    ];
    let orders = null;
    orders = (
      <div className={module.NoOrders} >
        <span>No {this.state.str} orders yet!</span>
      </div>
    );
    if(this.props.orders) {
      if(this.props.orders.length > 0) {
        orders = this.props.orders.map(order => {
          let timeAt = null;
          let time = order.status.find(status => status.type === 2);
          let init=false, reject = false, delivered = false, cancelled = false, confirmed = false, notdelivered = false;
          order.status.forEach(status => {
            if(status.type === 2) {
              init = true;
            } else if(status.type === 3) {
              init = true;
              cancelled = true;
              timeAt = status.timeStamp;
            }
            else if(status.type === 4) {
              confirmed =true;
              init = false;
              timeAt = status.timeStamp;
            }
            else if(status.type === 5) {
              reject = true;
              init = false;
              timeAt = status.timeStamp;
            }
            else if(status.type === 6) {
              delivered = true; 
              confirmed = true;
              init = false;
              timeAt = status.timeStamp;
            } else if(status.type === 7) {
              delivered = false;
              confirmed = true;
              init = false;
              notdelivered = true;
              timeAt = status.timeStamp;
            }
          });
          return <Order 
                    key={order._id} 
                    name={order.firstName + ' ' + order.lastName}
                    address={order.address}
                    time={time.timeStamp}
                    amount={parseInt(order.totalCost) + parseInt(order.deliveryCharge)}
                    subTotal={parseInt(order.totalCost)}
                    deliveryCharge={parseInt(order.deliveryCharge)}
                    phoneNumber={order.phoneNumber}
                    from={order.deliveryTime ? order.deliveryTime.from : null}
                    to={order.deliveryTime ? order.deliveryTime.to : null}
                    items={order.items}
                    allowCancelOrder={order.allowCancelOrder}
                    reject={reject}
                    delivered={delivered}
                    cancelled={cancelled}
                    confirmed={confirmed}
                    notdelivered={notdelivered}
                    init={init}
                    loading={this.getLoading(order._id)}
                    error={this.getError(order._id)}
                    confirmedError={this.props.confirmedUpdateError}
                    onReject={() => this.onReject(order._id)}
                    onConfirm={(data) => this.onConfirm(data, order._id)}
                    onDelivered={() => this.onDelivered(order._id)}
                    onNotDelivered={() => this.onNotDelivered(order._id)}
                    timeAt={timeAt}
                  />
        })
      }
    }
    if(this.props.loading) {
      orders = ( <Spinner /> );
    }
    let extra = null;
    if(this.props.moreLoading) {
      extra = ( <Spinner /> );
    } else if(this.state.done && this.props.orders && !this.props.loading) {
      if(this.props.orders.length > 0)
        extra = <div className={module.Exta} >No More {this.state.str} orders!</div>;
    }
    return (
      <div className={module.Container} onScroll={this.onScrollHandle} >
        <div className={module.Filter} >
          <span>Filter Orders By</span>
          <Select value={this.state.filter} onChange={(e) => this.onChangeFilter(e)} options={options} media ></Select>
          <div className={module.Refresh} >
            <Button clicked={this.onRefresh} media >Refresh</Button>
          </div>
        </div>
        {orders}
        {extra}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.orders.loading,
    error: state.orders.error,
    orders: state.orders.orders,
    token: state.auth.token,
    updateLoading: state.orders.updateLoading,
    updateError: state.orders.updateError,
    current: state.orders.current,
    moreLoading: state.orders.moreLoading,
    done: state.orders.done
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (pageNumber, pageSize, status, token) => dispatch(actions.fetchOrders(pageNumber, pageSize, status, token)),
    fetchMoreOrders: (pageNumber, pageSize, status, token) => dispatch(actions.fetchMoreOrders(pageNumber, pageSize, status, token)),
    onUpdateOrder: (token, body) => dispatch(actions.onUpdateOrder(token, body)),
    confirmedUpdateError: () => dispatch(actions.confirmedUpdateError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);