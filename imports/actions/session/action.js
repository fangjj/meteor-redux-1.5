 /**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import { registerReactiveSource } from 'meteor-redux-middlewares';
import { Session } from 'meteor/session';

export const getMenuOpen = () => registerReactiveSource({
    key: 'menuOpen',
    get: () => {
        const menuOpen = Session.get('menuOpen');
        return typeof menuOpen !== 'undefined' ? menuOpen : false;
    }
});

export const setMenuOpen = (value) => {
    return (dispatch, getState) => {
        Session.set('menuOpen', value);
    };
};




