import {
    GET_BRANDS,
    ADD_BRAND,
    DELETE_BRAND,
    SET_CURRENT_BRAND,
    CLEAR_CURRENT_BRAND,
    UPDATE_BRAND,
    BRAND_ERROR,
    CLEAR_BRANDS
} from 'context/types';

export default (state, action) => {
    switch (action.type) {
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload,
                loading: false
            };
        case ADD_BRAND:
            return {
                ...state,
                brands: [action.payload, ...state.brands],
                loading: false
            };
        case UPDATE_BRAND:
            return {
                ...state,
                brands: state.brands.map(brand =>
                    brand._id === action.payload._id ? action.payload : brand
                ),
                loading: false
            };
        case DELETE_BRAND:
            return {
                ...state,
                brands: state.brands.filter(
                    brand => brand._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_BRANDS:
            return {
                ...state,
                brands: null,
                error: null,
                current: null
            };
        case SET_CURRENT_BRAND:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_BRAND:
            return {
                ...state,
                current: null
            };
        case BRAND_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};