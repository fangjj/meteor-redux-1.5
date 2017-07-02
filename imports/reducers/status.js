/**
 * Created by jim on 2017/6/30.
 */
/**
 * Created by jim on 2017/6/23.
 */

import {
    STATUS_REACTIVE_SOURCE_CHANGED,
    CONNECTION_TIMEOUT,
} from '/imports/actions/status/actionType';

const initState = {
    timeouted: false,
    connected: false
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case STATUS_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                ...action.payload
            };
            break;
        case CONNECTION_TIMEOUT:
            newState = {
                ...state,
                timeouted: true
            };
            break;
        default:
            break;
    }
    return newState;
};