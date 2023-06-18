import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const initialOptions = {
  clientId:
    process.env.REACT_APP_PAYPAL_CLIENT_ID ||
    'AYBlbureR0b571pYQsQp0JS_XCb9dcVyX7YXdVC6HEnHsVjSu_h88mj07JK9QTlyGEN5pZ_ogFKKi5PV',
  currency: 'USD',
  intent: 'capture',
};

root.render(
  <UserProvider>
    <ProductsProvider>
      <CartProvider>
        <PayPalScriptProvider options={initialOptions}>
          <App />
        </PayPalScriptProvider>
      </CartProvider>
    </ProductsProvider>
  </UserProvider>
);
