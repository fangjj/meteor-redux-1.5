/**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { List } from './api/list';

import {
    LIST_PUBLIC_SUBSCRIPTION,
    LIST_PRIVATE_SUBSCRIPTION,
    LIST_PUBLIC_METHOD,
    LIST_PRIVATE_METHOD,
} from './actionType';


export const loadPrivate = (type) => {
    if(type === 'method'){
        return (dispatch, getState) => {
            Meteor.call(LIST_PRIVATE_METHOD, (err, ret) => {
                const action = {
                    type: LIST_PRIVATE_METHOD,
                    err,
                    ret
                };
                dispatch(action);
            });
        };
    }else{
        const options = {
            key: LIST_PRIVATE_SUBSCRIPTION,
            get: () => List.find({}).fetch(),
            subscribe: () => Meteor.subscribe(LIST_PRIVATE_SUBSCRIPTION),
            onReadyData: () => ({
                extraKey1: 'extraKey1',
                extraKey2: 'extraKey2',
            }),
        };
        return startSubscription(options);
    }

};

export const stopPrivate = () => {
    return stopSubscription(LIST_PRIVATE_SUBSCRIPTION);
};

export const loadPublic = (type) => {
    if(type === 'method'){
        return (dispatch, getState) => {
            Meteor.call(LIST_PUBLIC_METHOD, (err, ret) => {
                const action = {
                    type: LIST_PUBLIC_METHOD,
                    err,
                    ret
                };
                dispatch(action);
            });
        };
    }else{
        const options = {
            key: LIST_PUBLIC_SUBSCRIPTION,
            get: () => List.find({}).fetch(),
            subscribe: () => Meteor.subscribe(LIST_PUBLIC_SUBSCRIPTION),
            onReadyData: () => ({
                extraKey1: 'extraKey1',
                extraKey2: 'extraKey2',
            }),
        };
        return startSubscription(options);
    }

};

export const stopPublic = () => {
    return stopSubscription(LIST_PUBLIC_SUBSCRIPTION);
};

