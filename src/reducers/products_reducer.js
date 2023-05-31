import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_DATA_SUCCESS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  CLEAR_FILTERS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === GET_DATA_SUCCESS) {
    const { products, categories, companies, maxPrice } = action.payload;
    const featured_products = products.filter(
      (product) => product.featured === true
    );
    return {
      ...state,
      products,
      featured_products,
      companies: [{ id: 'all', name: 'All' }, ...companies],
      categories: [{ id: 'all', name: 'All' }, ...categories],
      max_price: maxPrice,
      price: maxPrice,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    const { product } = action.payload;
    return {
      ...state,
      product,
    };
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    const { products, totalProducts, numOfPages } = action.payload;
    return {
      ...state,
      products,
      totalProducts,
      numOfPages,
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    let { name, value } = action.payload;
    value = typeof value === 'string' ? value.toLowerCase() : value;
    return {
      ...state,
      page: 1,
      [name]: value,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      text: '',
      companyId: 'all',
      categoryId: 'all',
      color: 'all',
      price: state.max_price,
      sort: 'price-lowest',
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default products_reducer;
