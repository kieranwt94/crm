import {
    GET_ORDERS,
    ADD_ORDER,
    DELETE_ORDER,
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER,
    UPDATE_ORDER,
    ORDER_ERROR,
    CLEAR_ORDERS
} from 'context/types';

export default (state, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        case ADD_ORDER:
            return {
                ...state,
                orders: [action.payload, ...state.orders],
                loading: false
            };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
                loading: false
            };
        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(
                    order => order._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_ORDERS:
            return {
                ...state,
                orders: null,
                error: null,
                current: null
            };
        case SET_CURRENT_ORDER:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_ORDER:
            return {
                ...state,
                current: null
            };
        case ORDER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};