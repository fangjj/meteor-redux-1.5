 /**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import { registerReactiveSource } from 'meteor-redux-middlewares';
import { Session } from 'meteor/session';

export const menu = () => registerReactiveSource({
    key: 'menu',
    get: () => Session.get('menu') || false,
});

export const menuSet = (value) => {
    return (dispatch, getState) => {
        Session.set('menu', value);
    };
};

export const isSub = () => registerReactiveSource({
    key: 'issub',
    get: () => typeof Session.get('issub') !== 'undefined' ? Session.get('issub') : true,
});

export const isSubSet = (value) => {
    return (dispatch, getState) => {
        Session.set('issub', value);
    };
};


