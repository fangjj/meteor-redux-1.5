/**
 * Created by jim on 2017/6/24.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import {CONNECTION_TIMEOUT_TIME} from '../constant';
import {connection, timeout} from '../action';
const Text = (text) => i18n.__(text);
import './ConnectNotification.less';

class ConnectNotification extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.onConnection();
        setTimeout(() => {
            this.props.onTimeout();
        }, CONNECTION_TIMEOUT_TIME);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.timeout !== this.props.timeout && this.props.connected){
            return false;
        }else {
            return true;
        }
    }

    render() {
        const {timeout, connected} = this.props;
        if(timeout && !connected){
            return (
                <div className="notifications">
                    <div className="notification">
                        <span className="icon-sync" />
                        <div className="meta">
                            <div className="title-notification">
                                {Text('components.connectionNotification.tryingToConnect')}
                            </div>
                            <div className="description">
                                {Text('components.connectionNotification.connectionIssue')}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }
}

ConnectNotification.PropTypes ={
    timeout: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    onTimeout: PropTypes.func.isRequired,
    onConnection: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        timeout: state.status.timeout,
        connected: state.status.connected,
        ready: state.status.ready,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTimeout: () => dispatch(timeout()),
        onConnection: () => dispatch(connection()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectNotification);