import React, { useReducer } from 'react';
import axios from 'axios';
import BrandContext from './brand.context';
import brandReducer from './brand.reducer';
import {
    GET_BRANDS,
    ADD_BRAND,
    DELETE_BRAND,
    SET_CURRENT_BRAND,
    CLEAR_CURRENT_BRAND,
    UPDATE_BRAND,
    CLEAR_BRANDS,
    BRAND_ERROR
} from 'context/types';

const BrandState = props => {
    const initialState = {
        brands: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(brandReducer, initialState);

    // Get Brands
    const getBrands = async () => {
        try {
            const res = await axios.get('/api/brands');

            dispatch({
                type: GET_BRANDS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: BRAND_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add Brand
    const addBrand = async brand => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/brands', brand, config);

            dispatch({
                type: ADD_BRAND,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: BRAND_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Delete Brand
    const deleteBrand = async id => {
        try {
            await axios.delete(`/api/brands/${id}`);

            dispatch({
                type: DELETE_BRAND,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: BRAND_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Update Brand
    const updateBrand = async brand => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/brands/${brand._id}`,
                brand,
                config
            );

            dispatch({
                type: UPDATE_BRAND,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: BRAND_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Clear Brands
    const clearBrands = () => {
        dispatch({ type: CLEAR_BRANDS });
    };

    // Set Current Brand
    const setCurrentBrand = brand => {
        dispatch({ type: SET_CURRENT_BRAND, payload: brand });
    };

    // Clear Current Brand
    const clearCurrentBrand = () => {
        dispatch({ type: CLEAR_CURRENT_BRAND });
    };

    return (
        <BrandContext.Provider
            value={{
                brands: state.brands,
                current: state.current,
                error: state.error,
                addBrand,
                deleteBrand,
                setCurrentBrand,
                clearCurrentBrand,
                updateBrand,
                getBrands,
                clearBrands
            }}
        >
            {props.children}
        </BrandContext.Provider>
    );
};

export default BrandState;