import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
];

export const colors = [
  'black',
  'white',
  'gray',
  'brown',
  'red',
  'purple',
  'green',
  'olive',
  'yellow',
  'navy',
  'blue',
];

export const sorts = [
  { id: 'price-lowest', name: 'Price (Lowest)' },
  { id: 'price-highest', name: 'Price (Highest)' },
  { id: 'a-z', name: 'Name (A-Z)' },
  { id: 'z-a', name: 'Name (Z-A)' },
  { id: 'latest', name: 'Lastest' },
  { id: 'oldest', name: 'Oldest' },
  { id: 'rating-lowest', name: 'Rating (Lowest)' },
  { id: 'rating-highest', name: 'Rating (Highest)' },
];

export const WHITE_DISPLAY = '#eeedec';
export const WHITE = 'white';

export const INCREASE = 'increase';
export const DECREASE = 'decrease';

export const ALERT_DANGER = 'danger';
export const ALERT_SUCCESS = 'success';

export const products_url = '/api/v1/products';
export const categories_url = '/api/v1/categories';
export const companies_url = '/api/v1/companies';
export const auth_url = '/api/v1/auth';
export const reviews_url = '/api/v1/reviews';

// export const products_url = 'https://course-api.com/react-store-products'

// export const single_product_url = `https://course-api.com/react-store-single-product?id=`
