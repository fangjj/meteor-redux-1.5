import React from 'react';
import PropTypes from 'prop-types';
import MobileMenu from './MobileMenu.jsx';
import './AuthPage.less';

const AuthPage = ({ content, link }) => (
  <div className="page auth">
    <nav>
      <MobileMenu />
    </nav>
    <div className="content-scrollable">
      {content}
      {link}
    </div>
  </div>
);

AuthPage.PropTypes = {
  content: PropTypes.element,
  link: PropTypes.element,
};

export default AuthPage;
