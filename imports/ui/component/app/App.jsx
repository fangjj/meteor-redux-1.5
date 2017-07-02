import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.less';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loading from '/imports/ui/component/loading/Loading.jsx';
import ConnectNotification from '/imports/ui/component/status/ConnectNotification.jsx';
import UserMenu from '/imports/ui/component/user/UserMenu.jsx';
import LanguageToggle from '/imports/ui/component/language/Toggle.jsx';
import ListList from '/imports/ui/component/list/ListList.jsx';

class App extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.timeout();
        }, this.props.timeoutMills);
        this.props.meteorUser();
        this.props.meteorStatus();
        this.props.getMenuOpen();
        this.props.loadPrivate();
        this.props.loadPublic();
    }

    componentWillUnmount() {
        this.props.stopPrivate();
        this.props.stopPublic();
    }

    toggleMenu = () => {
        const {menuOpen, setMenuOpen} = this.props;
        setMenuOpen(!menuOpen);
    }

    logout = () => {
        this.props.logout();

        // if we are on a private list, we'll need to go to a public one
        //if (this.props.params.id) {
        //    const list = Lists.findOne(this.props.params.id);
        //    if (list.userId) {
        //        const publicList = Lists.findOne({ userId: { $exists: false } });
        //        this.context.router.push(`/lists/${publicList._id}`);
        //    }
        //}
    }

    render() {
        const {menuOpen, loading, children, connected, timeouted, user, userOpen, userOpenSet, lists, locale, router} = this.props;
        return (
            <div id="container" className={menuOpen ? 'menu-open' : ''}>
                <section id="menu">
                    <LanguageToggle />
                    <UserMenu user={user} logout={this.logout} userOpen={userOpen} userOpenSet={userOpenSet}/>
                    <ListList lists={lists} locale={locale} router={router} />
                </section>
                {timeouted && !connected ? <ConnectNotification /> : null}
                <div className="content-overlay" onClick={this.toggleMenu}/>
                <div id="content-container">
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                    >
                        {loading ? <Loading key="loading"/> : children}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

App.PropTypes = {
    user: PropTypes.object.isRequired,
    meteorUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    connected: PropTypes.bool.isRequired,
    timeouted: PropTypes.bool.isRequired,
    timeoutMills: PropTypes.number.isRequired,
    meteorStatus: PropTypes.func.isRequired,
    timeout: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    getMenuOpen: PropTypes.func.isRequired,
    setMenuOpen: PropTypes.func.isRequired,
    loadPrivate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loadPublic: PropTypes.func.isRequired,
    stopPrivate: PropTypes.func.isRequired,
    stopPublic: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,

};

export default App;