import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import { IoCart } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { MdOutlineHomeWork } from 'react-icons/md';

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

export const meLinks = [
  { id: 1, text: 'my orders', path: '/me', icon: <IoCart /> },
  {
    id: 2,
    text: 'account & security',
    path: '/me/account',
    icon: <FaUser />,
  },
  {
    id: 3,
    text: 'my addresses',
    path: '/me/addresses',
    icon: <MdOutlineHomeWork />,
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

export const products_url = 'products';
export const categories_url = 'categories';
export const companies_url = 'companies';
export const auth_url = 'auth';
export const reviews_url = 'reviews';
export const address_url = 'addresses';
export const orders_url = 'orders';
export const users_url = 'users';

export const baseUrl = '/api/v1';
