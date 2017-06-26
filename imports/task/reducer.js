/**
 * Created by jim on 2017/6/23.
 */

import {
    TASK_LIST_SUBSCRIPTION_READY,
    TASK_LIST_SUBSCRIPTION_CHANGED,
    TASK_LIST_SUBSCRIPTION,
    STOP_SUBSCRIPTION,
    TASK_INSERT_METHOD,
    TASK_LIST_METHOD,
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
        case TASK_LIST_METHOD:
            newState = {
                ...state,
                ready: true,
                stop: true,
                data: action.ret
            };
            break;
        case TASK_LIST_SUBSCRIPTION_READY:
            newState = {
                ...state,
                ready: action.payload.ready
            };
            break;
        case TASK_LIST_SUBSCRIPTION_CHANGED:
            newState = {
                ...state,
                data: action.payload
            };
            break;
        case STOP_SUBSCRIPTION:
            if ( action.payload === TASK_LIST_SUBSCRIPTION ) {
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

