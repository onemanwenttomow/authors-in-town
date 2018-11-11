import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import reducer from './reducer';

import { Welcome } from './welcome';
import App from './app.js';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />;
} else {
    elem =
        <Provider store={store}>
            <App />
        </Provider>;
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
