import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import pluralize from 'pluralize';

import Hero from 'components/hero/hero';
import Section from 'components/section/section';
import ContentBox from 'components/content-box/content-box';
import { formatActionButton } from 'utils';

export const BrandsList = () => {
    const [brands, setBrands] = useState([]);
    const { SearchBar } = Search;
    const type = 'brand';
    const history = useHistory();
    const columns = [
        { dataField: 'id', text: 'ID', sort: true },
        { dataField: 'name', text: 'Name', sort: true },
        { align: 'right', formatter: formatActionButton, formatExtraData: { type: pluralize(type), history} }
    ];

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await axios.get(`/api/brands/`);
            setBrands(response.data.brands);
        }
        fetchBrands();
    }, []);
    
    return (
        <>
            <Hero title="Brands" />
            <Section>
                <ToolkitProvider keyField="id" data={brands} columns={columns} search>
                    {props =>
                        <ContentBox header={`All ${pluralize(type)}`} color="red" table>
                            <SearchBar {...props.searchProps} />
                            <BootstrapTable {...props.baseProps} bootstrap4 bordered={false} pagination={paginationFactory()} noDataIndication={`No ${pluralize(type)} found.`} />
                        </ContentBox>
                    }
                </ToolkitProvider>
            </Section>
        </>
    );
}