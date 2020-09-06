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

export const ServicesList = () => {
    const [services, setServices] = useState([]);
    const { SearchBar } = Search;
    const type = 'service';
    const history = useHistory();
    const columns = [
        { dataField: 'id', text: '#', sort: true },
        { dataField: 'name', text: 'Name', sort: true }
    ];
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            history.push(`/${pluralize(type)}/${row.id}`);
        }
    }
    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get(`/api/services/`);
            setServices(response.data.services);
        }
        fetchServices();
    }, []);

    return (
        <>
            <Hero title="Services" />
            <Section>
                <ToolkitProvider keyField="id" data={services} columns={columns} search>
                    {props =>
                        <ContentBox header={`All ${pluralize(type)}`} color="green" table>
                            <SearchBar {...props.searchProps} />
                            <BootstrapTable {...props.baseProps} selectRow={selectRow} bootstrap4 bordered={false} pagination={paginationFactory()} noDataIndication={`No ${pluralize(type)} found.`} />
                        </ContentBox>
                    }
                </ToolkitProvider>
            </Section>
        </>
    );
}