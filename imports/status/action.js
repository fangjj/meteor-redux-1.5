 /**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import { registerReactiveSource } from 'meteor-redux-middlewares';
import {
    CONNECTION_TIMEOUT,
} from './actionType';

export const connection = () => registerReactiveSource({
    key: 'connection',
    get: () => Meteor.status() || {},
});

export const timeout = () => {
    return {
        type: CONNECTION_TIMEOUT
    };
};

