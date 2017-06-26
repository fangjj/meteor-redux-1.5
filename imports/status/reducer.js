/**
 * Created by jim on 2017/6/23.
 */

import {
    CONNECTION_REACTIVE_SOURCE_CHANGED,
    CONNECTION_TIMEOUT,
} from './actionType';

const initState = {
    timeout: false,
    connected: false,
    ready: false
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case CONNECTION_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                connected: action.payload.connected,
                ready: true
            };
            break;
        case CONNECTION_TIMEOUT:
            newState = {
                ...state,
                timeout: true
            };
            break;
        default:
            break;
    }
    return newState;
};