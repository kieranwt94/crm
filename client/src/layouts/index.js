import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

import Sidebar from 'components/sidebar/sidebar';
import Header from 'components/header/header';
import Content from 'components/content/content';
import UserContext from 'contexts/user';

import s from 'layouts/index.module.scss';

export default ({ children }) => {
    const location = useLocation();
    let history = useHistory();
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }
            const tokenRes = await axios.post(
                '/api/auth/validate-token',
                null,
                { headers: { 'x-auth-token': token } }
            );
            if (tokenRes.data) {
                const userRes = await axios.get('/api/users/', {
                    headers: { 'x-auth-token': token },
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            } else {
                history.push('/login');
            }
        };

        checkLoggedIn();
    }, []);

    if (location.pathname === '/login') {
        return (
            <UserContext.Provider value={{ userData, setUserData }}>
                <div className={s.page___login}>
                    {children}
                </div>
            </UserContext.Provider>
        );
    }

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <div className={s.page}>
                <Sidebar />
                <Header />
                <Content>
                    {children}
                </Content>
            </div>
        </UserContext.Provider>
    );
}