import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {register, errorSet} from '/imports/actions/user/action';
import {_} from 'meteor/underscore';
import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);

import AuthPage from './AuthPage.jsx';

class Register extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {

    }

    emailRef = (node) => {
        this.email = node;
    }

    passwordRef = (node) => {
        this.password = node;
    }

    confirmRef = (node) => {
        this.confirm = node;
    }

    onSubmit = (event) => {
        event.preventDefault();
        const email = this.email.value;
        const password = this.password.value;
        const confirm = this.confirm.value;
        const {errorSet, onRegister} = this.props;

        if (!email) {
            errorSet('email', Text('pages.authPageSignIn.emailRequired'));
            return;
        }
        if (!password) {
            errorSet('password', Text('pages.authPageSignIn.passwordRequired'));
            return;
        }
        if (confirm !== password) {
            errorSet('confirm', Text('pages.authPageJoin.passwordConfirm'));
            return;
        }

        onRegister({email, password});
    }

    renderError(error) {
        if (error && Object.keys(error).length) {
            const errorMessages = Object.keys(error).map(key => error[key]);
            return errorMessages.map(msg => (
                <div className="list-item" key={msg}>{msg}</div>
            ))
        } else {
            return null;
        }
    }

    getError(error, register){
        if (register && register.error) {
            error = {...error, ...{register: register.error.reason}};
        }
        return error;
    }

    shouldComponentUpdate(nextProps, nextState) {
        //const oldError = this.getError(this.props.error, this.props.register);
        //const newError = this.getError(nextProps.error, nextProps.register);
        //return _.isEqual(this.props.user, nextProps.user) && !_.isEqual(oldError, newError);
        return true;
    }

    render() {

        let {error, register, user, router} = this.props;
        if (user && Object.keys(user).length) {
            //已经登录
            router.push('/');
            return null;
        }
        if (register && register.status) {
            //到主路由
            router.push('/');
            return null;

        }
        error = this.getError(error, register);

        const errorClass = key => error[key] && 'error';
        const content = (
            <div className="wrapper-auth">
                <h1 className="title-auth">
                    {Text('pages.authPageJoin.join')}
                </h1>
                <p className="subtitle-auth">
                    {Text('pages.authPageJoin.joinReason')}
                </p>
                <form onSubmit={this.onSubmit}>
                    <div className="list-errors">
                        {this.renderError(error)}
                    </div>
                    <div className={`input-symbol ${errorClass('email')}`}>
                        <input type="email" name="email" ref={this.emailRef} placeholder={Text('pages.authPageJoin.yourEmail')} />
                        <span className="icon-email" title={Text('pages.authPageJoin.yourEmail')}></span>
                    </div>
                    <div className={`input-symbol ${errorClass('password')}`}>
                        <input type="password" name="password" ref={this.passwordRef} placeholder={Text('pages.authPageJoin.password')} />
                        <span className="icon-lock" title={Text('pages.authPageJoin.password')}></span>
                    </div>
                    <div className={`input-symbol ${errorClass('confirm')}`}>
                        <input type="password" name="confirm" ref={this.confirmRef} placeholder={Text('pages.authPageJoin.confirmPassword')} />
                        <span className="icon-lock" title={Text('pages.authPageJoin.confirmPassword')} />
                    </div>
                    <button type="submit" className="btn-primary">
                        {Text('pages.authPageJoin.joinNow')}
                    </button>
                </form>
            </div>
        );
        const link = (
            <Link to="/signin" className="link-auth-alt">
                {Text('pages.authPageJoin.haveAccountSignIn')}
            </Link>
        );
        return <AuthPage content={content} link={link}/>;
    }
}


Register.PropTypes = {
    error: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    onRegister: PropTypes.func.isRequired,
    errorSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.data,
        error: state.user.error,
        register: state.user.register,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRegister: (options) => dispatch(register(options)),
        errorSet: (key, error) => dispatch(errorSet(key, error)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
