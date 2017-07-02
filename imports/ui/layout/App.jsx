/**
 * Created by jim on 2017/6/24.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.less';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import {actions as sessionAcions} from '/imports/session/index';
import {view as Language} from '/imports/language/index';
import {view as Status} from '/imports/status/index';
import {view as User} from '/imports/user/index';


class App extends Component {

    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.onMenu();
    }

    toggleMenu = () => {
        const {menu, onMenuSet} = this.props;
        onMenuSet(!menu);
    }

    render() {
        const {
            menu,
            children
        } = this.props;
        return (
            <div id="container" className={menu ? 'menu-open' : ''}>
                <section id="menu">
                    <Language></Language>
                    <User.User></User.User>
                </section>
                <Status></Status>
                <div className="content-overlay" onClick={this.toggleMenu}></div>
                <div id="content-container">
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                    >
                        {children}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

App.PropTypes ={
    menu: PropTypes.bool.isRequired,
    onMenu: PropTypes.func.isRequired,
    onMenuSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        menu: state.session.menu,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {menu, menuSet} = sessionAcions;
    return {
        onMenu: () => dispatch(menu()),
        onMenuSet: (value) => dispatch(menuSet(value)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);