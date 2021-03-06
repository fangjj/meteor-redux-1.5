/**
 * Created by jim on 2017/6/22.
 */
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from '/imports/store/index';

import App from '/imports/app/view/index';
import {view as User} from '/imports/user/index';
//import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
//import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
//import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => {
    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="login" component={User.Login} />
                <Route path="register" component={User.Register} />
            </Route>
        </Router>
    );
};

export default Routes;