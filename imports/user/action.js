 /**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { startSubscription } from 'meteor-redux-middlewares';
import { stopSubscription } from 'meteor-redux-middlewares';

import { registerReactiveSource } from 'meteor-redux-middlewares';

import { User } from '/imports/user/api/user';
import {
    USER_LOGOUT,
    USER_LOGIN,
    USER_REGISTER,
    USER_ME_SUBSCRIPTION,
    STOP_SUBSCRIPTION,
    OPEN_SET,
    ERROR_SET,
} from './actionType';


export const meteorUser = () => registerReactiveSource({
    key: 'user',
    get: () => Meteor.user() || {},
});

export const loadData = () => {
    const options = {
        key: USER_ME_SUBSCRIPTION,
        get: () => User.findOne({_id : this.userId}),
        subscribe: () => Meteor.subscribe(USER_ME_SUBSCRIPTION),
        onReadyData: () => ({
            extraKey1: 'extraKey1',
            extraKey2: 'extraKey2',
        }),
    };
    return startSubscription(options);
};

export const stopData = () => {
    return stopSubscription(STOP_SUBSCRIPTION);
};

export const logout = () => {
    return (dispatch, getState) => {
        Meteor.logout(error => {
            const action = {
                type: USER_LOGOUT,
                error
            }
            dispatch(action);
        });
    };
};

export const login = (user, password) => {
    return (dispatch, getState) => {
        Meteor.loginWithPassword(user, password, error => {
            const status = error ? false : true;
            const login = {status, error};
            const action = {
                type: USER_LOGIN,
                login
            };
            dispatch(action);
        });
    };
};

export const register = (options) => {
    return (dispatch, getState) => {
        Accounts.createUser(options, error => {
            const status = error ? false : true;
            const register = {status, error};
            const action = {
                type: USER_REGISTER,
                register
            };
            dispatch(action);
        });
    };
};

export const openSet = (value) => {
    return {
        type: OPEN_SET,
        value,
    }
};

export const errorSet = (key, error) => {
    return {
        type: ERROR_SET,
        key,
        error,
    }
};