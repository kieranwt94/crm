import React, { useState, useEffect } from 'react';
import axios from 'axios';
import groupBy from 'lodash.groupby'; 
import { PieChart } from 'react-minimal-pie-chart';

import ContentBox from 'components/content-box/content-box';
import { getBrandColour } from 'utils';

import s from './charts.module.scss';

export default () => {
    const [data, setData] = useState([]);
    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif',
    };
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`/api/orders/`);
            const items = groupBy(response.data.orders, order => order.brand.name);
            Object.entries(items).forEach(([key, value], index) => {
                const obj = {};
                obj.title = key;
                obj.value = value.length;
                obj.color = getBrandColour(key);
                data.push(obj);
            });
        }
        fetchOrders();
    }, []);

    return (
        <div className={s.charts}>
            <ContentBox header="Orders by brand" color="grey">
                <PieChart
                    data={data}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{...defaultLabelStyle}}
                />
            </ContentBox>
        </div>
    );
}