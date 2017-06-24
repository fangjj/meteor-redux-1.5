/**
 * Created by jim on 2017/6/22.
 */
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '/imports/store/index';

import Task from '/imports/task/view/index';
const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => {
    return (
        <Router history={history}>
            <Route path="/" component={Task}></Route>
        </Router>
    );
};

export default Routes;