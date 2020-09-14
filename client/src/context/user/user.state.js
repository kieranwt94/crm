import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './user.context';
import userReducer from './user.reducer';
import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    UPDATE_USER,
    CLEAR_USERS,
    USER_ERROR
} from 'context/types';

const UserState = props => {
    const initialState = {
        users: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    // Get Users
    const getUsers = async () => {
        try {
            const res = await axios.get('/api/users');

            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add User
    const addUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', user, config);

            dispatch({
                type: ADD_USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Delete User
    const deleteUser = async id => {
        try {
            await axios.delete(`/api/users/${id}`);

            dispatch({
                type: DELETE_USER,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Update User
    const updateUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/users/${user._id}`,
                user,
                config
            );

            dispatch({
                type: UPDATE_USER,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Clear Users
    const clearUsers = () => {
        dispatch({ type: CLEAR_USERS });
    };

    // Set Current User
    const setCurrentUser = user => {
        dispatch({ type: SET_CURRENT_USER, payload: user });
    };

    // Clear Current User
    const clearCurrentUser = () => {
        dispatch({ type: CLEAR_CURRENT_USER });
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                current: state.current,
                error: state.error,
                addUser,
                deleteUser,
                setCurrentUser,
                clearCurrentUser,
                updateUser,
                getUsers,
                clearUsers
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;