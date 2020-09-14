import React, { useReducer } from 'react';
import axios from 'axios';
import CustomerContext from './customer.context';
import customerReducer from './customer.reducer';
import {
    GET_CUSTOMERS,
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    SET_CURRENT_CUSTOMER,
    CLEAR_CURRENT_CUSTOMER,
    UPDATE_CUSTOMER,
    CLEAR_CUSTOMERS,
    CUSTOMER_ERROR
} from 'context/types';

const CustomerState = props => {
    const initialState = {
        customers: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(customerReducer, initialState);

    // Get Customers
    const getCustomers = async () => {
        try {
            const res = await axios.get('/api/customers');

            dispatch({
                type: GET_CUSTOMERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CUSTOMER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add Customer
    const addCustomer = async customer => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/customers', customer, config);

            dispatch({
                type: ADD_CUSTOMER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CUSTOMER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Delete Customer
    const deleteCustomer = async id => {
        try {
            await axios.delete(`/api/customers/${id}`);

            dispatch({
                type: DELETE_CUSTOMER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CUSTOMER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Update Customer
    const updateCustomer = async customer => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/customers/${customer._id}`,
                customer,
                config
            );

            dispatch({
                type: UPDATE_CUSTOMER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CUSTOMER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Clear Customers
    const clearCustomers = () => {
        dispatch({ type: CLEAR_CUSTOMERS });
    };

    // Set Current Customer
    const setCurrentCustomer = customer => {
        dispatch({ type: SET_CURRENT_CUSTOMER, payload: customer });
    };

    // Clear Current Customer
    const clearCurrentCustomer = () => {
        dispatch({ type: CLEAR_CURRENT_CUSTOMER });
    };

    return (
        <CustomerContext.Provider
            value={{
                customers: state.customers,
                current: state.current,
                error: state.error,
                addCustomer,
                deleteCustomer,
                setCurrentCustomer,
                clearCurrentCustomer,
                updateCustomer,
                getCustomers,
                clearCustomers
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    );
};

export default CustomerState;