/**
 * Created by jim on 2017/6/22.
 */
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '/imports/store/index';

import AppContainer from '/imports/ui/container/AppContainer.jsx';
import Login from '/imports/ui/component/user/Login.jsx';
import Register from '/imports/ui/component/user/Register.jsx';
//import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => {
    return (
        <Router history={history}>
            <Route path="/" component={AppContainer}>
                <Route path="login" component={Login} />
                <Route path="register" component={Register} />
            </Route>
        </Router>
    );
};

export default Routes;