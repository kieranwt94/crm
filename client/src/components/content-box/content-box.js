import React from 'react';
import { Badge } from 'reactstrap';

import s from './content-box.module.scss';

export default ({ tabs, header, color, children, margin, table, badge }) => (
  <div className={`${s.contentBox} ${tabs ? s.contentBox___tabs : ''}`} style={{ marginBottom: margin ? margin : '30px'}}>
    { header && (
      <div className={`${s.contentBox__header} ${color ? s[`contentBox__header___${color}`]: ''}`}>
        <h3>{header}</h3>
        { badge && (
          <Badge color="success" pill>{badge}</Badge>
        )}
      </div>
    )}
    <div className={s.contentBox__body} style={{ padding: table ? '0px' : '20px' }}>
      { children }
    </div>
  </div>
);
