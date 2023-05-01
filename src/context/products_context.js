import { useContext, useEffect, useReducer } from 'react';
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';
import reducer from '../reducers/products_reducer';
import React from 'react';
import axios from 'axios';
import {
  categories_url,
  companies_url,
  products_url,
} from '../utils/constants';

const ProductsContext = React.createContext();
const initialState = {
  isSidebarOpen: false,
  product_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  categories: [],
  companies: [],
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchData = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const [productsResponse, categoriesResponse, companiesResponse] =
        await Promise.all([
          axios.get(products_url),
          axios.get(categories_url),
          axios.get(companies_url),
        ]);
      const products = productsResponse.data.products;
      const categories = categoriesResponse.data.categories;
      const companies = companiesResponse.data.companies;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products, categories, companies },
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const product = response.data.product;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
