/**
 * Created by jim on 2017/6/22.
 */
import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';

import {createStore, applyMiddleware} from 'redux';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';


import reducer from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const { sources, subscriptions } = createReactiveMiddlewares(Tracker);

let middlewares = [
    sources,
    subscriptions,
    thunk,
    logger,
];

if (process.env.NODE_ENV !== 'production') {
    const immutableStateInvariantMiddleware = require('redux-immutable-state-invariant');
    middlewares.push(immutableStateInvariantMiddleware.default());
}

const store = createStore(reducer, {}, composeWithDevTools(
    applyMiddleware(...middlewares)
));

export default store;

