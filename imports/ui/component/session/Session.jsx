/**
 * Created by jim on 2017/6/24.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {menu, menuSet, isSub, isSubSet} from '../action';

class Session extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.onMenu();
        this.props.onIsSub();
    }


    toggleMenu = () => {
        const {menu, onMenuSet} = this.props;
        onMenuSet(!menu);
    }

    toggleIsSub = () => {
        const {isSub, onIsSubSet} = this.props;
        onIsSubSet(!isSub);
    }

    render() {
        const {menu, isSub} = this.props;
        return (
            <div>
                {menu.toString()}
                <button onClick={this.toggleMenu}>toggleMenu</button>
                {isSub.toString()}
                <button onClick={this.toggleIsSub}>toggleIsSub</button>
            </div>
        );
    }
}

Session.PropTypes ={
    menu: PropTypes.bool.isRequired,
    onMenu: PropTypes.func.isRequired,
    onMenuSet: PropTypes.func.isRequired,
    isSub: PropTypes.bool.isRequired,
    onIsSub: PropTypes.func.isRequired,
    onIsSubSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        menu: state.session.menu,
        isSub: state.session.isSub,
        ready: state.session.ready,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMenu: () => dispatch(menu()),
        onMenuSet: (value) => dispatch(menuSet(value)),
        onIsSub: () => dispatch(isSub()),
        onIsSubSet: (value) => dispatch(isSubSet(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);