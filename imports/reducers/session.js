/**
 * Created by jim on 2017/6/30.
 */
/**
 * Created by jim on 2017/6/23.
 */

import {
    MENUOPEN_REACTIVE_SOURCE_CHANGED,
} from  '/imports/actions/session/actionType';

const initState = {
    menuOpen: false,
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case MENUOPEN_REACTIVE_SOURCE_CHANGED:
            newState = {
                ...state,
                menuOpen: action.payload,
            };
            break;
        default:
            break;
    }
    return newState;
};