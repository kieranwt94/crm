import React from 'react';

import s from './section.module.scss';

export default ({ children, name }) => (
  <section className={`${s.section} ${name ? s[`section___${name}`] : ''}`}>
    { children }
  </section>
);
