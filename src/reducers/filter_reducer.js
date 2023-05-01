import {
  CLEAR_FILTERS,
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
      companies: [{ name: 'All', id: '0' }, ...payload.companies],
      categories: [{ name: 'All', id: '0' }, ...payload.categories],
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
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().includes(text.toLowerCase());
      });
    }

    if (category.toLowerCase() !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.categoryId.name.toLowerCase() === category.toLowerCase();
      });
    }

    if (company.toLowerCase() !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.companyId.name.toLowerCase() === company.toLowerCase();
      });
    }

    if (color.toLowerCase() !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find(
          (c) => c.toLowerCase() === color.toLowerCase()
        );
      });
    }

    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    });

    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping;
      });
    }
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'All',
        category: 'All',
        color: 'All',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No matching "${action.type}" - action type`);
};

export default filter_reducer;
