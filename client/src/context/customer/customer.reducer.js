import {
    GET_CUSTOMERS,
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    SET_CURRENT_CUSTOMER,
    CLEAR_CURRENT_CUSTOMER,
    UPDATE_CUSTOMER,
    CUSTOMER_ERROR,
    CLEAR_CUSTOMERS
} from 'context/types';

export default (state, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload,
                loading: false
            };
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [action.payload, ...state.customers],
                loading: false
            };
        case UPDATE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === action.payload._id ? action.payload : customer
                ),
                loading: false
            };
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(
                    customer => customer._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_CUSTOMERS:
            return {
                ...state,
                customers: null,
                error: null,
                current: null
            };
        case SET_CURRENT_CUSTOMER:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_CUSTOMER:
            return {
                ...state,
                current: null
            };
        case CUSTOMER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};