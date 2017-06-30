/**
 * Created by jim on 2017/6/23.
 */

import {
    USER_REACTIVE_SOURCE_CHANGED,
    USER_ME_SUBSCRIPTION_READY,
    USER_ME_SUBSCRIPTION_CHANGED,
    USER_ME_SUBSCRIPTION,
    STOP_SUBSCRIPTION,
    USER_LOGOUT,
    USER_LOGIN,
    USER_REGISTER,
    OPEN_SET,
    ERROR_SET,
} from './actionType';

const initState = {
    ready: false,
    data: {},
    stop: false,
    open: false,
    error: {},
    login: {},
    register: {},
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
                register:{},
                login: action.login
            };
            break;
        case USER_REGISTER:
            newState = {
                ...state,
                error: {},
                login:{},
                register: action.register
            };
            break;
        case USER_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                data: action.payload,
                ready: true
            };
            break;
        case USER_ME_SUBSCRIPTION_READY:
            newState = {
                ...state,
                ready: action.payload.ready
            };
            break;
        case USER_ME_SUBSCRIPTION_CHANGED:
            newState = {
                ...state,
                data: action.payload
            };
            break;
        case STOP_SUBSCRIPTION:
            if (action.payload === USER_ME_SUBSCRIPTION) {
                newState = {
                    ...state,
                    stop: true
                };
            }
            break;
        default:
            break;
    }
    return newState;
};