import React, { useState, useEffect, useContext } from 'react'; 
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import Hero from 'components/hero/hero';
import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';
import DashboardBox from 'components/dashboard-box/dashboard-box';
import LatestOrders from 'components/latest-orders/latest-orders';
import { OrdersByBrand } from 'components/charts';
import UserContext from 'contexts/user';
import { capitalize } from 'utils';

export const Dashboard = () => {
    const { userData } = useContext(UserContext);
    const { token } = userData;
    const [stats, setStats] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);
    const colours = ['red', 'orange', 'yellow', 'green'];
    const icons = ['faBadge', 'faUsers', 'faBoxFull', 'faReceipt'];

    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get(`/api/dashboard/stats/`, {
                headers: { 'x-auth-token': token },
            });
            setStats(response.data.stats);
        }
        trackPromise(fetchStats());
    }, []);

    useEffect(() => {
        const fetchLatestOrders = async () => {
            const response = await axios.get(`/api/dashboard/latest-orders/`, {
                headers: { 'x-auth-token': token },
            });
            setLatestOrders(response.data.orders);
        }
        trackPromise(fetchLatestOrders());
    }, []);

    return (
        <>
            <Hero title="Dashboard" />
            <Section name="dashboard-stats">
                <ContentBox>
                    <Row>
                        {stats.map((stat, i) => (
                            <Col lg={3} md={4} sm={6} xs={12} key={`dashboard-stat-${i}`}>
                                <DashboardBox
                                    color={colours[i]}
                                    icon={icons[i]}
                                    title={capitalize(stat.name)}
                                    total={stat.count}
                                />
                            </Col>
                        ))}
                    </Row>
                </ContentBox>
            </Section>
            <Section>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <LatestOrders orders={latestOrders} />
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={3}>
                        <OrdersByBrand />
                    </Col>
                </Row>
            </Section>
        </>
    )
}