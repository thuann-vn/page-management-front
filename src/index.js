import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store, persistor} from './store/index'
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import vi from 'javascript-time-ago/locale/vi';
import OrderModalContext from './contexts/orderModalContext';
JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(vi);

React.icons = icons
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App/>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
