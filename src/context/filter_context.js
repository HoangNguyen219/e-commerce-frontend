import React, { useEffect, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { useProductsContext } from './products_context';
import { LOAD_PRODUCTS } from '../actions';

const initialState = {
  filtered_products: [],
  all_products: [],
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (products) {
      dispatch({ type: LOAD_PRODUCTS, payload: products });
    }
  }, [products]);

  return <FilterContext.Provider>{children}</FilterContext.Provider>;
};
