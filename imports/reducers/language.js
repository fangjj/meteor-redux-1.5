/**
 * Created by jim on 2017/6/30.
 */
/**
 * Created by jim on 2017/6/23.
 */
import i18n from 'meteor/universe:i18n';
import {
    LANGUAGE_ALL_METHOD,
    LANGUAGE_SET,
} from '/imports/actions/language/actionType';

const initState = {
    all: [],
    locale: i18n.getLocale()
};

export default (state = initState, action) => {
    let newState = state;
    switch (action.type) {
        case LANGUAGE_ALL_METHOD:
            newState = {
                ...state,
                all: action.ret
            };
            break;
        case LANGUAGE_SET:
            newState = {
                ...state,
                locale: action.locale
            };
            break;
        default:
            break;
    }
    return newState;
};