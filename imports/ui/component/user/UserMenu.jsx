/**
 * Created by jim on 2017/6/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './UserMenu.less';
import { Link } from 'react-router';

import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);

class UserMenu extends Component {
    constructor() {
        super(...arguments);
    }

    renderLogin() {
        return (
            <div className="user-menu">
                <Link to="/login" className="btn-secondary">
                    {Text('components.userMenu.login')}
                </Link>
                <Link to="/register" className="btn-secondary">
                    {Text('components.userMenu.join')}
                </Link>
            </div>
        );
    }

    toggleOpen = () => {
        const {userOpen, userOpenSet} = this.props;
        userOpenSet(!userOpen);
    }

    renderLogout() {
        const { user, logout, userOpen } = this.props;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));
        return (
            <div className="user-menu vertical">
                <a href="#toggle" className="btn-secondary" onClick={this.toggleOpen}>
                    {userOpen ? <span className="icon-arrow-up"/> : <span className="icon-arrow-down"/>}
                    {emailLocalPart}
                </a>
                {
                    userOpen ? (
                        <a className="btn-secondary" onClick={logout}>
                            {Text('components.userMenu.logout')}
                        </a>
                    ) : null
                }
            </div>
        );
    }

    render() {
        const {user} = this.props;
        if (user && Object.keys(user).length) {
            return this.renderLogout();
        } else {
            return this.renderLogin();
        }
    }
}

UserMenu.PropTypes = {
    userOpen: PropTypes.bool.isRequired,
    userOpenSet: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default UserMenu;