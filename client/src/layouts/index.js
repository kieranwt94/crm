import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import Sidebar from 'components/sidebar/sidebar';
import Header from 'components/header/header';
import Content from 'components/content/content';

import s from 'layouts/index.module.scss';

export default ({ children }) => (
    <div className={s.page}>
        <Sidebar />
        <Header />
        <Content>
            {children}
        </Content>
    </div>
)