import React, { useEffect } from 'react';
import GridView from './GridView';
import { useProductsContext } from '../context/products_context';
import ListView from './ListView';
import Loading from './Loading';

const ProductList = () => {
  const {
    products,
    grid_view,
    getProducts,
    text,
    categoryId,
    companyId,
    color,
    price,
    shipping,
    sort,
    page,
    products_loading: loading,
  } = useProductsContext();
  useEffect(() => {
    getProducts();
  }, [page, text, categoryId, companyId, color, price, shipping, sort]);

  if (loading) {
    return <Loading />;
  }

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products}></GridView>;
};

export default ProductList;
