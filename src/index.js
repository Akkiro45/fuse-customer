import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/orders';
import shopReducer from './store/reducers/shop';
import inventoryReducer from './store/reducers/inventory';
import profileReducer from './store/reducers/profile';
import photoUploadReducer from './store/reducers/photo-upload';
import loadingReducers from './store/reducers/loading';
import resetpassReducer from './store/reducers/resetpass';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  orders: orderReducer,
  shop: shopReducer,
  inv: inventoryReducer,
  profile: profileReducer,
  upload: photoUploadReducer,
  loading: loadingReducers,
  resetpass: resetpassReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store} >
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
