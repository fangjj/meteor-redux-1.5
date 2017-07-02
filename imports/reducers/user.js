/**
 * Created by jim on 2017/6/30.
 */
/**
 * Created by jim on 2017/6/23.
 */

import {
    USER_REACTIVE_SOURCE_CHANGED,
    USER_LOGOUT,
    USER_LOGIN,
    USER_REGISTER,

    OPEN_SET,
    ERROR_SET,
} from '/imports/actions/user/actionType';

const initState = {
    data: {},
    error: {},
    login: {},
    register: {},

    //open: false,
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case ERROR_SET:
            newState = {
                ...state,
                error: {
                    ...initState.error,
                    [action.key]: action.error
                },
                login: {},
                register: {},
            };
            break;

        case OPEN_SET:
            newState = {
                ...state,
                open: action.value
            };
            break;

        case USER_LOGIN:
            newState = {
                ...state,
                error: {},
                register: {},
                login: action.login
            };
            break;
        case USER_REGISTER:
            newState = {
                ...state,
                error: {},
                login: {},
                register: action.register
            };
            break;
        case USER_LOGOUT:
            newState = {
                ...state,
                error: {},
                login: {},
                register: {}
            };
            break;
        case USER_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                data: action.payload,
            };
            break;
        default:
            break;
    }
    return newState;
};