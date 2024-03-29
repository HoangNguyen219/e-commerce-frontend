import { useContext, useReducer } from 'react';
import authFetch from '../utils/authFetch';
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_SUCCESS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  CLEAR_FILTERS,
  GET_DATA_SUCCESS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
} from '../actions';
import reducer from '../reducers/products_reducer';
import React from 'react';
import {
  ALERT_SUCCESS,
  categories_url,
  companies_url,
  products_url,
  reviews_url,
} from '../utils/constants';
import { useUserContext } from './user_context';

const ProductsContext = React.createContext();
const initialState = {
  isSidebarOpen: false,
  products: [],
  featured_products: [],
  product: {},
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
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { displayAlert, setLoading, handleError, setError, logoutUser } =
    useUserContext();

  const myFetch = authFetch(logoutUser);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse, companiesResponse] =
        await Promise.all([
          myFetch.get(products_url),
          myFetch.get(categories_url),
          myFetch.get(companies_url),
        ]);
      const { products, maxPrice } = productsResponse.data;
      const { categories } = categoriesResponse.data;
      const { companies } = companiesResponse.data;
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: { products, categories, companies, maxPrice },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getProducts = async () => {
    setLoading(true);
    const { page, text, companyId, categoryId, color, price, sort } = state;

    let url = `${products_url}?page=${page}&text=${text}&companyId=${companyId}&categoryId=${categoryId}&color=${color}&price=${price}&sort=${sort}`;
    try {
      const { data } = await myFetch.get(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts,
          numOfPages,
        },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const fetchSingleProduct = async (id) => {
    setLoading(true);
    try {
      const productResponse = await myFetch.get(`${products_url}/${id}`);
      const { product } = productResponse.data;

      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: { product },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const createReview = async (review) => {
    setLoading(true);
    const productId = state.product.id;
    try {
      const response = await myFetch.post(reviews_url, {
        ...review,
        productId,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Review added!',
      });
      setTimeout(() => {
        fetchSingleProduct(productId);
      }, 2000);
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const updateReview = async ({ review, id }) => {
    setLoading(true);
    const productId = state.product.id;
    try {
      const response = await myFetch.patch(`${reviews_url}/${id}`, {
        ...review,
        productId,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Review updated!',
      });
      fetchSingleProduct(productId);
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
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

  const deleteReview = async (id) => {
    setLoading(true);
    try {
      await myFetch.delete(`/${reviews_url}/${id}`);
      setError(false);
      fetchSingleProduct(state.product.id);
    } catch (error) {
      if (error.response.status === 401) return;
      handleError(error);
    }
    setLoading(false);
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
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
        createReview,
        fetchData,
        deleteReview,
        updateReview,
        changePage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
