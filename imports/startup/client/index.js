/**
 * Created by jim on 2017/6/21.
 */

import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import config from './config';
import Routes from './Routes';
import store from '/imports/store/index';


const renderBody = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Routes></Routes>
        </Provider>,
        document.getElementById('root')
    );
};

Meteor.startup( () => {
    config();
    renderBody();
});
