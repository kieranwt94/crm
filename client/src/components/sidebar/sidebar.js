import React from 'react';
import { Link } from 'react-router-dom';

import SidebarItem from './sidebar-item';
import s from './sidebar.module.scss';

export default() => (
  <aside className={s.sidebar}>
    <div className={s.sidebar__brand}>
      <Link to="/">
        <img src="https://s3-eu-west-1.amazonaws.com/crm.bluesquareoffices.com/bso-square.png" alt="Blue Square Offices logo" />
        <span className={s.sidebar__brandName}>BSO CRM</span>
      </Link>
    </div>
    <ul className={s.sidebar__nav}>
      <SidebarItem type="dashboard" icon="faColumns" />
      <SidebarItem type="brand" icon="faBadge" />
      <SidebarItem type="customer" icon="faUsers" />
      <SidebarItem type="order" icon="faReceipt" />
      <SidebarItem type="service" icon="faBoxFull" />
    </ul>
  </aside>
);