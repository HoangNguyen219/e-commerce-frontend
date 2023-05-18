import React, { useEffect } from 'react';
import Loading from '../../components/Loading';
import { useUserContext } from '../../context/user_context';
import { useCartContext } from '../../context/cart_context';
import Order from '../../components/Order';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const { isLoading, isError } = useUserContext();
  const { getOrders, orders } = useCartContext();

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (orders.length < 1) {
    return (
      <h4 style={{ textTransform: 'none' }}>
        No orders to display...
        <Link to="/cart" className="btn mg-left">
          Place an order
        </Link>
      </h4>
    );
  }
  return (
    <>
      <h5 className="inline">
        {orders.length} order
        {orders.length > 1 && 's'} found
      </h5>
      <Order orders={orders} />
    </>
  );
};

export default OrderPage;
