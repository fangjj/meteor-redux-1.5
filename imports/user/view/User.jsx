/**
 * Created by jim on 2017/6/24.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './User.less';
import { Link } from 'react-router';
import {meteorUser, logout, openSet} from '../action';
import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);

class User extends Component {

    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.meteorUser();
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
        const {open, openSet} = this.props;
        openSet(!open);
    }


    renderLogout() {
        const { user, logout, open } = this.props;
        const email = user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));
        return (
            <div className="user-menu vertical">
                <a href="#toggle" className="btn-secondary" onClick={this.toggleOpen}>
                    {open ? <span className="icon-arrow-up" /> : <span className="icon-arrow-down" />}
                    {emailLocalPart}
                </a>
                {
                    open ? (
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
        if(user && Object.keys(user).length){
            return this.renderLogout();
        }else{
            return this.renderLogin();
        }
    }
}

User.PropTypes ={
    open: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    meteorUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    openSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        open: state.user.open,
        user: state.user.data,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        meteorUser: () => dispatch(meteorUser()),
        logout: () => dispatch(logout()),
        openSet: (value) => dispatch(openSet(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
