import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';  // a middleware that inspect action created and 
                                       // dispatch action (App comp.) in redux store after axios.get answer

import App from './components/App';
import reducers from './reducers';  // import ./reducers/index.js  by convention

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

