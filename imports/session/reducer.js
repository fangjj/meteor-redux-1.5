/**
 * Created by jim on 2017/6/23.
 */

import {
    MENU_REACTIVE_SOURCE_CHANGED,
    ISSUB_REACTIVE_SOURCE_CHANGED,
} from './actionType';

const initState = {
    isSub: true,
    menu: false,
    ready: false
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case MENU_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                menu: action.payload,
                ready: true
            };
            break;
        case ISSUB_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                isSub: action.payload,
                ready: true
            };
            break;
        default:
            break;
    }
    return newState;
};