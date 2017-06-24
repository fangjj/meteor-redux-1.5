/**
 * Created by jim on 2017/6/23.
 */

import {
    USER_ME_SUBSCRIPTION_READY,
    USER_ME_SUBSCRIPTION_CHANGED,
    USER_ME_SUBSCRIPTION,
    STOP_SUBSCRIPTION,
    USER_LOGOUT,
    USER_LOGIN,
    USER_REGISTER,
} from './actionType';

const initState = {
    ready: false,
    data: [],
    stop: false
};

export default (state = initState, action) => {
    let newState = state;
    //console.log(action);
    switch (action.type) {
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
            if ( action.payload === USER_ME_SUBSCRIPTION ) {
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