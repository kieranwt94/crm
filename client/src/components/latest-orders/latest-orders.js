import React from 'react';
import { Table } from 'reactstrap';

import ContentBox from 'components/content-box/content-box';
import { formatPrice } from 'utils';

import s from './latest-orders.module.scss';

export default(props) => {
    const { orders } = props;

    return (
        <div className={s.latestOrders}>
            <ContentBox header="Latest orders" table color="yellow"> 
                <Table className={s.latestOrders__table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.customer.name}</td>
                                <td>{order.service.name}</td>
                                <td>{formatPrice(order.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ContentBox>
        </div>
    )
}