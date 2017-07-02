/**
 * Created by jim on 2017/6/23.
 */
import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

import {
    LANGUAGE_ALL_METHOD,
    LANGUAGE_SET,
} from './actionType';

export const languageSet = (locale, params) => {
    return (dispatch, getState) => {
        i18n.setLocale(locale, params);
        const action = {
            type: LANGUAGE_SET,
            locale
        };
        dispatch(action);
    };
};

export const languageAll = () => {
    return (dispatch, getState) => {
        Meteor.call(LANGUAGE_ALL_METHOD, (err, ret) => {
            const action = {
                type: LANGUAGE_ALL_METHOD,
                ret,
                err
            };
            dispatch(action);
        });
    };
};

