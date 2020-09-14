import React, { useReducer } from 'react';
import axios from 'axios';
import OrderContext from './order.context';
import orderReducer from './order.reducer';
import {
    GET_ORDERS,
    ADD_ORDER,
    DELETE_ORDER,
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER,
    UPDATE_ORDER,
    CLEAR_ORDERS,
    ORDER_ERROR
} from 'context/types';

const OrderState = props => {
    const initialState = {
        orders: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(orderReducer, initialState);

    // Get Orders
    const getOrders = async () => {
        try {
            const res = await axios.get('/api/orders');

            dispatch({
                type: GET_ORDERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add Order
    const addOrder = async order => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/orders', order, config);

            dispatch({
                type: ADD_ORDER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Delete Order
    const deleteOrder = async id => {
        try {
            await axios.delete(`/api/orders/${id}`);

            dispatch({
                type: DELETE_ORDER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Update Order
    const updateOrder = async order => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/orders/${order._id}`,
                order,
                config
            );

            dispatch({
                type: UPDATE_ORDER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ORDER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Clear Orders
    const clearOrders = () => {
        dispatch({ type: CLEAR_ORDERS });
    };

    // Set Current Order
    const setCurrentOrder = order => {
        dispatch({ type: SET_CURRENT_ORDER, payload: order });
    };

    // Clear Current Order
    const clearCurrentOrder = () => {
        dispatch({ type: CLEAR_CURRENT_ORDER });
    };

    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                current: state.current,
                error: state.error,
                addOrder,
                deleteOrder,
                setCurrentOrder,
                clearCurrentOrder,
                updateOrder,
                getOrders,
                clearOrders
            }}
        >
            {props.children}
        </OrderContext.Provider>
    );
};

export default OrderState;