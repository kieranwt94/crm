import React from 'react';
import { Container } from 'reactstrap';

import s from './content.module.scss';

export default ({ children }) => (
  <div className={s.content}>
    <Container className={s.content__container}>
      { children }
    </Container>
  </div>
);
