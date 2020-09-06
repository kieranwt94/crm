import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import pluralize from 'pluralize';

import Hero from 'components/hero/hero';
import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';
import { formatBrand, formatPrice, formatOrderStatus } from 'utils';

export const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const { SearchBar } = Search;
    const type = 'order';
    const history = useHistory();
    const columns = [
        { dataField: 'id', text: '#', sort: true },
        { dataField: 'brand.name', text: 'Brand', sort: true, formatter: formatBrand },
        { dataField: 'service.name', text: 'Service', sort: true },
        { dataField: 'customer.name', text: 'Customer', sort: true },
        { dataField: 'total', text: 'Total', sort: true, formatter: formatPrice },
        { dataField: 'status', text: 'Status', sort: true, formatter: formatOrderStatus }
    ];
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            history.push(`/${pluralize(type)}/${row.id}`);
        }
    }
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`/api/orders/`);
            setOrders(response.data.orders);
        }
        fetchOrders();
    }, []);

    return (
        <>
            <Hero title="Orders" />
            <Section>
                <ToolkitProvider keyField="id" data={orders} columns={columns} search pagination={paginationFactory()}>
                    {props =>
                        <ContentBox header={`All ${pluralize(type)}`} color="yellow" table>
                            <SearchBar {...props.searchProps} />
                            <BootstrapTable {...props.baseProps} selectRow={selectRow} bootstrap4 bordered={false} noDataIndication={`No ${pluralize(type)} found.`} />
                        </ContentBox>
                    }
                </ToolkitProvider>
            </Section>
        </>
    );
}