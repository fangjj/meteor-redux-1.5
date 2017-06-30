/**
 * Created by jim on 2017/6/22.
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
//import { reducer as taskReducer } from '/imports/task/index';
import { reducer as userReducer } from '/imports/user/index';
import { reducer as languageReducer } from '/imports/language/index';
import { reducer as statusReducer } from '/imports/status/index';
import { reducer as sessionReducer } from '/imports/session/index';
import { reducer as listReducer } from '/imports/list/index';

const reducer = combineReducers({
    routing: routerReducer,
    //task: taskReducer,
    user: userReducer,
    language: languageReducer,
    status: statusReducer,
    session: sessionReducer,
    list: listReducer,
});

export default reducer;