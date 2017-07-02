import { connect } from 'react-redux';
import  App  from '/imports/ui/component/app/App.jsx';
import {meteorUser, logout, openSet as userOpenSet} from '/imports/actions/user/action';
import {timeout, meteorStatus} from '/imports/actions/status/action';
import {CONNECTION_TIMEOUT_TIME} from '/imports/actions/status/constant';
import {getMenuOpen, setMenuOpen} from '/imports/actions/session/action';
import {loadPrivate, loadPublic, stopPrivate, stopPublic} from '/imports/actions/list/action';

const mapStateToProps = state => ({
    user: state.user.data,
    userOpen: state.user.open,
    connected: state.status.connected,
    timeouted: state.status.timeouted,
    timeoutMills: CONNECTION_TIMEOUT_TIME,
    menuOpen: state.session.menuOpen,
    loading: !(state.list.privateReady && state.list.publicReady),
    lists: state.list.data,
    locale: state.language.locale,
    //postsSubscriptionStopped: state.home.postsSubscriptionStopped,
});

const mapDispatchToProps = dispatch => ({
    meteorUser: () => dispatch(meteorUser()),
    logout: () => dispatch(logout()),
    userOpenSet: (value) => dispatch(userOpenSet(value)),
    meteorStatus: () => dispatch(meteorStatus()),
    timeout: () => dispatch(timeout()),
    getMenuOpen: () => dispatch(getMenuOpen()),
    setMenuOpen: (value) => dispatch(setMenuOpen(value)),
    loadPrivate: () => dispatch(loadPrivate()),
    loadPublic: () => dispatch(loadPublic()),
    stopPrivate: () => dispatch(stopPrivate()),
    stopPublic: () => dispatch(stopPublic()),
    //register: () => dispatch(register()),
    //stopPostsSubscription: () => dispatch(stopSubscription(HOME_POSTS_SUB)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
