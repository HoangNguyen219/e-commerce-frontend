import React from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
import { useEffect } from 'react';
import { useProductsContext } from '../context/products_context';

const HomePage = () => {
  const { fetchData } = useProductsContext();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
