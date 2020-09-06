import React from 'react';

import Section from 'components/section/section';
import s from './hero.module.scss';

export default({ title, breadcrumb }) => (
  <Section name="hero">
    <div className={s.hero}>
      <h1>{title}</h1>
    </div>
  </Section>
)
