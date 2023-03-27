import {
    ADD_PRODUCT,
    CLEAR_CARTS,
    DECREASE_QTY,
    GET_CARTS,
    GET_PRODUCTS,
    GET_TOTALS,
    INCREASE_QTY,
    PRODUCT_ERROR,
    REMOVE_PRODUCT,
    SET_LOADING,
    UPDATE_CART
} from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case GET_CARTS:
            return {
                ...state,
                carts: action.payload,
                loading: false
            }
        case ADD_PRODUCT:
            const tempState = state.carts.filter((cart) => action.payload.id === cart.id);

            if (tempState.length > 0) {
                return state;
            } else {
                return {
                    ...state,
                    carts: [...state.carts, action.payload,],
                    loading: false

                }
            }
        case CLEAR_CARTS:
            return {
                ...state,
                carts: [],
                loading: false
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                carts: state.carts.filter((cart) => cart._id !== action.payload)
            }
        case UPDATE_CART:
            return {
                ...state,
                carts: state.carts.map(cart => cart._id === action.payload._id ? action.payload : cart),
                loading: false
            }
        case INCREASE_QTY:
            let tempCart = state.carts.map((cart) => {
                if (cart._id === action.payload) {
                    return {
                        ...cart,
                        quantity: cart.quantity + 1
                        
                    }
                }
                return cart;
            })
            return {
                ...state,
                carts: tempCart
            }
        case DECREASE_QTY:
            let decCart = state.carts.map((cart) => {
                if (cart._id === action.payload) {
                    return {
                        ...cart,
                        quantity: cart.quantity - 1
                    }
                }
                return cart;
            }).filter((cart) => cart.quantity !== 0)
            return {
                ...state,
                carts: decCart
            }
        case GET_TOTALS:
            let { total, quantity } = state.carts.reduce((cartTotal, cartItem) => { 
                const { price, quantity } = cartItem;
                const itemTotal = price * quantity

                cartTotal.total += itemTotal
                cartTotal.quantity += quantity
                return cartTotal
            }, {
                total: 0,
                quantity: 0
            })
            total = parseFloat(total.toFixed(2));

            return {
                ...state,
                total,
                quantity
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    };
};