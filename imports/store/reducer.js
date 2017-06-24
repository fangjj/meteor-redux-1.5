/**
 * Created by jim on 2017/6/22.
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as taskReducer } from '/imports/task/index';
import { reducer as userReducer } from '/imports/user/index';

const reducer = combineReducers({
    routing: routerReducer,
    task: taskReducer,
    user: userReducer,
});

export default reducer;