import React, { useReducer } from 'react';
import axios from 'axios';
import ServiceContext from './service.context';
import serviceReducer from './service.reducer';
import {
    GET_SERVICES,
    ADD_SERVICE,
    DELETE_SERVICE,
    SET_CURRENT_SERVICE,
    CLEAR_CURRENT_SERVICE,
    UPDATE_SERVICE,
    CLEAR_SERVICES,
    SERVICE_ERROR
} from 'context/types';

const ServiceState = props => {
    const initialState = {
        services: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(serviceReducer, initialState);

    // Get Services
    const getServices = async () => {
        try {
            const res = await axios.get('/api/services');

            dispatch({
                type: GET_SERVICES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add Service
    const addService = async service => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/services', service, config);

            dispatch({
                type: ADD_SERVICE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Delete Service
    const deleteService = async id => {
        try {
            await axios.delete(`/api/services/${id}`);

            dispatch({
                type: DELETE_SERVICE,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Update Service
    const updateService = async service => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/services/${service._id}`,
                service,
                config
            );

            dispatch({
                type: UPDATE_SERVICE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Clear Services
    const clearServices = () => {
        dispatch({ type: CLEAR_SERVICES });
    };

    // Set Current Service
    const setCurrentService = service => {
        dispatch({ type: SET_CURRENT_SERVICE, payload: service });
    };

    // Clear Current Service
    const clearCurrentService = () => {
        dispatch({ type: CLEAR_CURRENT_SERVICE });
    };

    return (
        <ServiceContext.Provider
            value={{
                services: state.services,
                current: state.current,
                error: state.error,
                addService,
                deleteService,
                setCurrentService,
                clearCurrentService,
                updateService,
                getServices,
                clearServices
            }}
        >
            {props.children}
        </ServiceContext.Provider>
    );
};

export default ServiceState;