import React, { useEffect } from 'react';
import { useProductsContext } from '../context/products_context';
import { useUserContext } from '../context/user_context';
import { Error, Loading, ListView, GridView, PageBtnContainer } from '.';

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
    totatotalProducts,
    numOfPages,
    changePage,
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

  if (totatotalProducts < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  return (
    <>
      {grid_view === false ? (
        <ListView products={products} />
      ) : (
        <GridView products={products}></GridView>
      )}
      {numOfPages > 1 && (
        <PageBtnContainer
          numOfPages={numOfPages}
          page={page}
          changePage={changePage}
        />
      )}
    </>
  );
};

export default ProductList;
