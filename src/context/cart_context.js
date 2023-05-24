import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  GET_CONFIGS,
  GET_ORDERS,
  GET_SINGLE_ORDER,
  REMOVE_CART_ITEM,
  SET_CART,
  SET_FREE_SHIPPING_FEE,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from './user_context';
import { capitalize } from '../utils/helpers';
import {
  ALERT_SUCCESS,
  config_url,
  orders_url,
  products_url,
} from '../utils/constants';
import authFetch from '../utils/authFetch';

const getLocalStorage = () => {
  let localCart = localStorage.getItem('localCart');
  if (localCart) {
    return JSON.parse(localCart);
  } else {
    return [];
  }
};

const initialState = {
  localCart: getLocalStorage(),
  cart: [],
  total: 0,
  shippingFee: 0,
  minFreeShippingAmount: 0,
  configs: [],
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

  const setFreeShippingFee = () => {
    dispatch({ type: SET_FREE_SHIPPING_FEE });
  };

  const setCart = async () => {
    const dataPromises = state.localCart.map((item) =>
      myFetch.get(`${products_url}/${item.productId}`).then(({ data }) => {
        const { price, primaryImage: image, name } = data.product;
        const { stock: max } = data.product.colorStocks.find(
          (cs) => cs.color === item.color
        );
        return { ...item, price, image, name, max };
      })
    );
    const data = await Promise.all(dataPromises);
    dispatch({ type: SET_CART, payload: { data } });
  };

  useEffect(() => {
    setCart();
  }, [state.localCart]);

  useEffect(() => {
    if (state.total >= state.minFreeShippingAmount) {
      setFreeShippingFee();
    } else {
      getConfigs();
    }
  }, [state.total]);

  const getConfigs = async () => {
    try {
      const { data } = await myFetch.get(`${config_url}`);
      dispatch({
        type: GET_CONFIGS,
        payload: { configs: data.configs },
      });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getConfigs();
  }, []);

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
    localStorage.setItem('localCart', JSON.stringify(state.localCart));
  }, [state.localCart]);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
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
