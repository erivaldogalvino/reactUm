import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';  // a middleware that inspect action created and 
                                       // dispatch action (App comp.) in redux store after axios.get answer

import App from './components/App';
import reducers from './reducers';  // import ./reducers/index.js  by convention

// temporario pra teste do email
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);


