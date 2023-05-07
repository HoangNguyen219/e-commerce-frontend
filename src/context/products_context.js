import { useContext, useEffect, useReducer } from 'react';
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  CLEAR_FILTERS,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  HANDLE_CHANGE,
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
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  categories: [],
  companies: [],
  grid_view: true,
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  sort: 'price-lowest',
  text: '',
  companyId: 'all',
  categoryId: 'all',
  color: 'all',
  min_price: 0,
  max_price: 0,
  price: 0,
  shipping: false,
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
    dispatch({ type: GET_DATA_BEGIN });
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
        type: GET_DATA_SUCCESS,
        payload: { products, categories, companies },
      });
    } catch (error) {
      dispatch({ type: GET_DATA_ERROR });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProducts = async () => {
    const { page, text, companyId, categoryId, color, price, shipping, sort } =
      state;

    let url = `${products_url}?page=${page}&text=${text}&companyId=${companyId}&categoryId=${categoryId}&color=${color}&price=${price}&shipping=${shipping}&sort=${sort}`;
    dispatch({ type: GET_DATA_BEGIN });
    try {
      const { data } = await axios.get(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts,
          numOfPages,
        },
      });
    } catch (error) {
      dispatch({ type: GET_DATA_ERROR });
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

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        setGridView,
        setListView,
        clearFilters,
        getProducts,
        handleChange,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
