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

export const UsersList = () => {
    const [users, setUsers] = useState([]);
    const { SearchBar } = Search;
    const type = 'user';
    const history = useHistory();
    const columns = [
        { dataField: 'id', text: '#', sort: true },
        { dataField: 'name', text: 'Name', sort: true },
        { dataField: 'email_address', text: 'Email Address', sort: true }
    ];
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            history.push(`/${pluralize(type)}/${row.id}`);
        }
    }
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`/api/users/`);
            setUsers(response.data.users);
        }
        fetchUsers();
    }, []);

    return (
        <>
            <Hero title="Users" />
            <Section>
                <ToolkitProvider keyField="id" data={users} columns={columns} search pagination={paginationFactory()}>
                    {props =>
                        <ContentBox header={`All ${pluralize(type)}`} color="blue" table>
                            <SearchBar {...props.searchProps} />
                            <BootstrapTable {...props.baseProps} selectRow={selectRow} bootstrap4 bordered={false} noDataIndication={`No ${pluralize(type)} found.`} />
                        </ContentBox>
                    }
                </ToolkitProvider>
            </Section>
        </>
    );
}