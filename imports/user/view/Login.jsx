import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login, errorSet, meteorUser} from '../action';

import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);

import AuthPage from './AuthPage.jsx';

class Login extends Component {

    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.meteorUser();
    }

    emailRef = (node) => {
        this.email = node;
    }

    passwordRef = (node) => {
        this.password = node;
    }

    onSubmit = (event) => {
        event.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        const {errorSet, onLogin} = this.props;

        if (!email) {
            errorSet('email', Text('pages.authPageSignIn.emailRequired'));
            return;
        }
        if (!password) {
            errorSet('password', Text('pages.authPageSignIn.passwordRequired'));
            return;
        }

        onLogin(email, password);
    }

    renderError(error) {
        if(error && Object.keys(error).length){
            const errorMessages = Object.keys(error).map(key => error[key]);
            return errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
            ))
        }else{
            return null;
        }
    }

    render() {
        let {error, login, user} = this.props;
        if(user && Object.keys(user).length){
            //已经登录
            return null;
        }
        if(login && login.status){
            //到主路由
            return null;
        }
        if(login && login.error){
            error = {...error, ...{login: login.error.reason}};
        }
        const errorClass = key => error[key] && 'error';
        const content = (
            <div className="wrapper-auth">
                <h1 className="title-auth">
                    {Text('pages.authPageSignIn.signIn')}
                </h1>
                <p className="subtitle-auth">
                    {Text('pages.authPageSignIn.signInReason')}
                </p>
                <form onSubmit={this.onSubmit}>
                    <div className="list-errors">
                        {this.renderError(error)}
                    </div>
                    <div className={`input-symbol ${errorClass('email')}`}>
                        <input type="email" name="email" ref={this.emailRef} placeholder={Text('pages.authPageSignIn.yourEmail')} />
                        <span className="icon-email"  title={Text('pages.authPageSignIn.yourEmail')}></span>
                    </div>
                    <div className={`input-symbol ${errorClass('password')}`}>
                        <input type="password" name="password" ref={this.passwordRef} placeholder={Text('pages.authPageSignIn.password')}/>
                        <span className="icon-lock" title={Text('pages.authPageSignIn.password')}> </span>
                    </div>
                    <button type="submit" className="btn-primary">
                        {Text('pages.authPageSignIn.signInButton')}
                    </button>
                </form>
            </div>
        );

        const link = (
            <Link to="/register" className="link-auth-alt">
                {Text('pages.authPageSignIn.needAccount')}
            </Link>
        );

        return <AuthPage content={content} link={link}></AuthPage>;
    }
}

Login.PropTypes ={
    error: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    errorSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.data,
        error: state.user.error,
        login: state.user.login,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        meteorUser: () => dispatch(meteorUser()),
        onLogin: (user, password) => dispatch(login(user, password)),
        errorSet: (key, error) => dispatch(errorSet(key, error)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);


