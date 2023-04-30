import React from 'react';
import GridView from './GridView';
import { useFilterContext } from '../context/filter_context';

const ProductList = () => {
  const { filtered_products: products } = useFilterContext();
  console.log(useFilterContext());
  return <GridView products={products}></GridView>;
};

export default ProductList;
