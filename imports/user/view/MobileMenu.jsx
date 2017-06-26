import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {actions as sessionAcions} from '/imports/session/index';

import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);

class MobileMenu extends Component {
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
    return (
      <div className="nav-group">
        <a href="#toggle-menu" className="nav-item" onClick={this.toggleMenu}>
          <span
            className="icon-list-unordered"
            title={Text('components.mobileMenu.showMenu')}
          />
        </a>
      </div>
    );
  }
}

MobileMenu.PropTypes ={
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);