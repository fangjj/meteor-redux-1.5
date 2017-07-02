import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {setMenuOpen} from '/imports/actions/session/action';

import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);

class MobileMenu extends Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
  }

  toggleMenu = () => {
    const {menuOpen, setMenuOpen} = this.props;
    setMenuOpen(!menuOpen);
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
  setMenuOpen: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    menuOpen: state.session.menuOpen,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setMenuOpen: (value) => dispatch(setMenuOpen(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);