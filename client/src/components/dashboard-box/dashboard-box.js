import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBadge, faUsers, faBoxFull, faReceipt } from '@fortawesome/pro-solid-svg-icons';

import s from './dashboard.module.scss';

export default ({ color, icon, title, total }) => {
  const iconLookup = (icon) => {
    switch (icon) {
      case 'faBadge': return faBadge;
      case 'faUsers': return faUsers;
      case 'faBoxFull': return faBoxFull;
      case 'faReceipt': return faReceipt;
      default: throw new Error(`No icon exists with the name: ${icon}.`);
    }
  };

  return (
    <div className={`${s.dashboardBox} ${s[`dashboardBox___${color}`]}`}>
      <Link to={`/${title.toLowerCase()}`}>
        <span className={s.dashboardBox__total}>{total}</span>
        <span className={s.dashboardBox__title}>{title}</span>
        <div className={s.dashboardBox__icon}>
          <FontAwesomeIcon icon={iconLookup(icon)} />
        </div>
      </Link>
    </div>
  );
}
