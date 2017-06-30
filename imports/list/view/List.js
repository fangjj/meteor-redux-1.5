/**
 * Created by jim on 2017/6/23.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Random } from 'meteor/random';

import {loadData, stopData} from '../action';
import {actions as userActions} from '/imports/user/index';
import Item from './Item';

class List extends Component {
    constructor() {
        super(...arguments);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
    }

    loadData = () => {
        this.props.loadData('method')
    }

    componentDidMount() {
        this.loadData();
        //this.props.loadUser();
        this.props.meteorUser();
    }

    componentWillUnmount() {
        this.props.stopData();
        //this.props.stopUser();
    }

    register() {
        const username = Random.id(10).toLowerCase();
        const password = '123456';
        const options = {username, password};
        this.props.register(options);
    }

    login() {
        const user = 'jhh7j9meaw';
        const password = '123456';
        this.props.login(user,password);
    }

    logout () {
        this.props.logout();
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>{`Todo List ${JSON.stringify(this.props.user)}`}</h1>
                </header>
                <button onClick={this.register}>注册</button>
                <button onClick={this.login}>登录</button>
                <button onClick={this.logout}>退出</button>
                <button onClick={this.loadData}>刷新</button>
                <ul>
                    {
                        this.props.data.map(item => {
                            const {_id, text} = item;
                            return (
                                <Item key={_id} _id={_id} text={text} />
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userReady: state.user.ready,
        user: state.user.data,
        userStop: state.user.stop,
        data: state.task.data,
        ready: state.task.ready,
        stop: state.task.stop,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        meteorUser: () => dispatch(userActions.meteorUser()),
        loadUser: () => dispatch(userActions.loadData()),
        stopUser: () => dispatch(userActions.stopData()),
        loadData: (type) => dispatch(loadData(type)),
        stopData: () => dispatch(stopData()),
        register: (options) => dispatch(userActions.register(options)),
        login: (user, password) => dispatch(userActions.login(user, password)),
        logout: () => dispatch(userActions.logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);