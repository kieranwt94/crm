import React from 'react';
import { connect } from 'react-redux';

import s from './header.module.scss';

const Header = ({ auth: { user } }) => (
  <div className={s.header}>
    <div className={s.header__inner}>
      <div className={s.header__user}>Welcome back <strong>{user && user.name}</strong></div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Header);