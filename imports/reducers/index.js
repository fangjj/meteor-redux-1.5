/**
 * Created by jim on 2017/6/30.
 */
/**
 * Created by jim on 2017/6/22.
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
//import { reducer as taskReducer } from '/imports/task/index';
import userReducer from './user';
import languageReducer from './language';
import statusReducer  from './status';
import sessionReducer from './session';
import listReducer from './list';

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