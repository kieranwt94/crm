import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    UPDATE_USER,
    USER_ERROR,
    CLEAR_USERS
} from 'context/types';

export default (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users],
                loading: false
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user
                ),
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(
                    user => user._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: null,
                error: null,
                current: null
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                current: null
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};