import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';

const initialState = {
  cart: [],
  total_items: 0,
  subtotal: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
