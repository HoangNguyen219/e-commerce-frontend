import {
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from '../actions';

const filter_reducer = (state, action) => {
  const payload = action.payload;
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = payload.products.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: payload.products,
      filtered_products: [...payload.products],
      companies: [{ name: 'all', id: '0' }, ...payload.companies],
      categories: [{ name: 'all', id: '0' }, ...payload.categories],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
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
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    return { ...state };
  }
  throw new Error(`No matching "${action.type}" - action type`);
};

export default filter_reducer;
