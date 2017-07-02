/**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';


import { Task } from '/imports/task/api/task';

import {
    TASK_LIST_SUBSCRIPTION,
    TASK_INSERT_METHOD,
    TASK_LIST_METHOD,
} from './actionType';


export const loadData = (type) => {
    if(type === 'method'){
        return (dispatch, getState) => {
            Meteor.call(TASK_LIST_METHOD, (err, ret) => {
                const action = {
                    type: TASK_LIST_METHOD,
                    err,
                    ret
                };
                dispatch(action);
            });
        };
    }else{
        const options = {
            key: TASK_LIST_SUBSCRIPTION,
            get: () => Task.find({}).fetch(),
            subscribe: () => Meteor.subscribe(TASK_LIST_SUBSCRIPTION),
            onReadyData: () => ({
                extraKey1: 'extraKey1',
                extraKey2: 'extraKey2',
            }),
        };
        return startSubscription(options);
    }

};

export const stopData = () => {
    return stopSubscription(TASK_LIST_SUBSCRIPTION);
};

export const addData = (_id, text) => {
    return (dispatch, getState) => {
        Meteor.call(TASK_INSERT_METHOD,{_id, text}, (err, ret) => {
            const action = {
                type: TASK_INSERT_METHOD,
                err,
                ret
            };
            dispatch(action);
        });
    };
};