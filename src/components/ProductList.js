import React, { useEffect } from 'react';
import GridView from './GridView';
import { useProductsContext } from '../context/products_context';
import { useUserContext } from '../context/user_context';
import ListView from './ListView';
import Loading from './Loading';
import { Error } from '.';

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
  } = useProductsContext();

  const { isLoading, isError } = useUserContext();
  useEffect(() => {
    getProducts();
  }, [page, text, categoryId, companyId, color, price, shipping, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
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
