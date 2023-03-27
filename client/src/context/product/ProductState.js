import React, { useEffect, useReducer } from "react";
import axios from "axios";
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
    GET_PRODUCTS,
    GET_CARTS,
    SET_LOADING,
    CLEAR_CARTS,
    REMOVE_PRODUCT,
    INCREASE_QTY,
    DECREASE_QTY,
    UPDATE_CART,
    GET_TOTALS,
    ADD_PRODUCT,
    PRODUCT_ERROR
} from '../types';

const ProductState = props => {
    const initialState = {
        products: [],
        carts: [],
        total: 0,
        quantity: 0,
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    // get all products
    const getProducts = async () => {
        setLoading();

        const res = await axios.get('https://fakestoreapi.com/products');

        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    };

    // // get single product
    const addProduct = async product => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            setLoading();
            
            const res = await axios.post('/api/carts', product, config);
            
            dispatch({
                type: ADD_PRODUCT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            })
        }

    };

    const clearCart = () => dispatch({ type: CLEAR_CARTS });

    const removeProduct = async (id) => {
        try {
            await axios.delete(`/api/carts/${id}`);

            dispatch({
                type: REMOVE_PRODUCT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            });
        }
    };

     const updateCart = async cart => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
         try {
            
            const res = await axios.put(`/api/carts/${cart._id}`, cart, config);
            dispatch({
                type: UPDATE_CART,
                payload: res.data
            });
        } catch (err) {  
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            });
        }
    }

    const increaseQty = (id) => {
        dispatch({
            type: INCREASE_QTY,
            payload: id
        });
    };
   
    const decreaseQty = (id) => {
        dispatch({
            type: DECREASE_QTY,
            payload: id
        });
    };

    const getCarts = async () => {
        try {
            const res = await axios.get('/api/carts');

            dispatch({
                type: GET_CARTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response.msg
            })
        }
    }


    useEffect(() => {
        dispatch({ type: GET_TOTALS })
    }, [state.carts]);

    // Setloading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <ProductContext.Provider
        value={{
            products: state.products,
            carts: state.carts,
            total: state.total,
            quantity: state.quantity,
            loading: state.loading,
            error: state.error,
            getProducts,
            setLoading,
            clearCart,
            removeProduct,
            increaseQty,
            decreaseQty,
            addProduct,
            getCarts,
            updateCart
        }}
    >
        {props.children}
    </ProductContext.Provider>
}

export default ProductState;