import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBadge, faBuilding, faColumns, faDoorOpen, faIdCard, faKaaba, faUsers, faBoxFull, faReceipt } from '@fortawesome/pro-regular-svg-icons';
import pluralize from 'pluralize';

import { capitalize  } from 'utils';
import s from './sidebar.module.scss';

export default({ type, icon }) => {
  const iconLookup = (icon) => {
    switch (icon) {
      case 'faBadge': return faBadge;
      case 'faBuilding': return faBuilding;
      case 'faColumns': return faColumns;
      case 'faDoorOpen': return faDoorOpen;
      case 'faIdCard': return faIdCard;
      case 'faKaaba': return faKaaba;
      case 'faUsers': return faUsers;
      case 'faBoxFull': return faBoxFull;
      case 'faReceipt': return faReceipt;
      default: throw new Error(`No icon exists with the name: ${icon}.`);
    }
  };

  const link = type === 'dashboard' ? '/' : `/${pluralize(type)}`;

  return (
    <li className={s.sidebar__navItem}>
      <Link className={s.sidebar__navLink} to={link}>
        <FontAwesomeIcon icon={iconLookup(icon)} className={s.sidebar__navIcon} />
        <span className={s.sidebar__navText}>
          { type === 'dashboard' ? capitalize(type) : capitalize(pluralize(type))}
        </span>
      </Link>
    </li>
  );
}