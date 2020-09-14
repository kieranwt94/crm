import {
    GET_SERVICES,
    ADD_SERVICE,
    DELETE_SERVICE,
    SET_CURRENT_SERVICE,
    CLEAR_CURRENT_SERVICE,
    UPDATE_SERVICE,
    SERVICE_ERROR,
    CLEAR_SERVICES
} from 'context/types';

export default (state, action) => {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload,
                loading: false
            };
        case ADD_SERVICE:
            return {
                ...state,
                services: [action.payload, ...state.services],
                loading: false
            };
        case UPDATE_SERVICE:
            return {
                ...state,
                services: state.services.map(service =>
                    service._id === action.payload._id ? action.payload : service
                ),
                loading: false
            };
        case DELETE_SERVICE:
            return {
                ...state,
                services: state.services.filter(
                    service => service._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_SERVICES:
            return {
                ...state,
                services: null,
                error: null,
                current: null
            };
        case SET_CURRENT_SERVICE:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_SERVICE:
            return {
                ...state,
                current: null
            };
        case SERVICE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};