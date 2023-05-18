import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  GET_ORDERS,
  GET_SINGLE_ORDER,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from './user_context';
import { capitalize } from '../utils/helpers';
import { ALERT_SUCCESS, orders_url } from '../utils/constants';
import authFetch from '../utils/authFetch';

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total: 0,
  shipping_fee: 534,
  orders: [],
  order: {},
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const { logoutUser, setLoading, displayAlert, setError, handleError } =
    useUserContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const myFetch = authFetch(logoutUser);
  const addToCart = (id, color, amount, product) => {
    toast.success(`${capitalize(product.name)} added to cart`, {
      autoClose: 1000,
    });
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const createOrder = async (values) => {
    setLoading(true);
    try {
      const response = await myFetch.post(orders_url, values);
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Order created! Redirecting...',
      });
      clearCart();
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await myFetch.get(`${orders_url}/showAllMyOrders`);
      dispatch({
        type: GET_ORDERS,
        payload: { orders: response.data.orders },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getSingleOrder = async (id) => {
    setLoading(true);
    try {
      const response = await myFetch.get(`${orders_url}/${id}`);
      dispatch({
        type: GET_SINGLE_ORDER,
        payload: { order: response.data.order },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
        createOrder,
        getOrders,
        getSingleOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
