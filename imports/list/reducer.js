/**
 * Created by jim on 2017/6/23.
 */

import {
    LIST_PRIVATE_SUBSCRIPTION_READY,
    LIST_PRIVATE_SUBSCRIPTION_CHANGED,
    LIST_PUBLIC_SUBSCRIPTION_READY,
    LIST_PUBLIC_SUBSCRIPTION_CHANGED,
    STOP_SUBSCRIPTION,
    LIST_PUBLIC_SUBSCRIPTION,
    LIST_PRIVATE_SUBSCRIPTION,
    LIST_PUBLIC_METHOD,
    LIST_PRIVATE_METHOD,
} from './actionType';

const initState = {
    privateReady: false,
    private: [],
    privateStop: false,
    privateError: null,
    publicReady: false,
    public: [],
    publicStop: false,
    publicError: null,
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case LIST_PRIVATE_METHOD:
            newState = {
                ...state,
                privateReady: true,
                privateStop: true,
                private: action.ret,
                privateError: action.err,
            };
            break;
        case LIST_PRIVATE_SUBSCRIPTION_READY:
            newState = {
                ...state,
                privateReady: action.payload.ready
            };
            break;
        case LIST_PRIVATE_SUBSCRIPTION_CHANGED:
            newState = {
                ...state,
                private: action.payload
            };
            break;
        case STOP_SUBSCRIPTION:
            if ( action.payload === LIST_PRIVATE_SUBSCRIPTION ) {
                newState = {
                    ...state,
                    privateStop: true
                };
            }else if ( action.payload === LIST_PUBLIC_SUBSCRIPTION ) {
                newState = {
                    ...state,
                    publicStop: true
                };
            }
            break;
        case LIST_PUBLIC_METHOD:
            newState = {
                ...state,
                publicReady: true,
                publicStop: true,
                public: action.ret,
                publicError: action.err,
            };
            break;
        case LIST_PUBLIC_SUBSCRIPTION_READY:
            newState = {
                ...state,
                publicReady: action.payload.ready
            };
            break;
        case LIST_PUBLIC_SUBSCRIPTION_CHANGED:
            newState = {
                ...state,
                public: action.payload
            };
            break;
        default:
            break;
    }
    return newState;
};

