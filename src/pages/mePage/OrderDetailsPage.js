import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { useCartContext } from '../../context/cart_context';
import {
  CartColumns,
  CartTotal,
  OrderItem,
  Loading,
  Error,
} from '../../components';
import { useUserContext } from '../../context/user_context';
const OrderDetailsPage = () => {
  const { id } = useParams();
  const { getSingleOrder, order } = useCartContext();
  useEffect(() => {
    getSingleOrder(id);
  }, [id]);

  const { isError, isLoading } = useUserContext();

  const {
    shippingFee,
    subtotal,
    orderItems,
    processStatus,
    paymentStatus,
    addressId: addr,
    paymentMethod,
    createdAt,
  } = order;

  return (
    <Wrapper>
      {isLoading && <Loading />}
      {isError ? (
        <Error />
      ) : (
        <>
          <p>Order ID: {id}</p>
          <CartColumns />
          {orderItems &&
            orderItems.map((item) => {
              return <OrderItem key={item.id} item={item} />;
            })}
          <hr />
          <section className="total">
            <div>
              <h4>Shipping Address</h4>
              {addr && (
                <p>
                  Mobile: {addr.mobile} <br />
                  Address: {addr.address} - {addr.city} - {addr.state} -{' '}
                  {addr.country}
                </p>
              )}
              <h5>
                Order date:{' '}
                <span className="date">
                  {new Date(createdAt).toLocaleString()}
                </span>
              </h5>
              <hr />
              <div className="info">
                <h5>
                  Payment Method: <span>{paymentMethod}</span>
                </h5>

                <h5>
                  Processing Status:{' '}
                  <span
                    className={
                      processStatus === 'pending' ||
                      processStatus === 'canceled' ||
                      processStatus === 'returned'
                        ? 'status red'
                        : 'status green'
                    }
                  >
                    {processStatus}
                  </span>
                </h5>

                <h5>
                  Payment Status:{' '}
                  <span
                    className={
                      paymentStatus === 'unpaid' || paymentStatus === 'canceled'
                        ? 'status red'
                        : 'status green'
                    }
                  >
                    {paymentStatus}
                  </span>
                </h5>
              </div>
            </div>

            <CartTotal total={subtotal} shippingFee={shippingFee} />
          </section>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .total {
    margin-top: 3rem;
    display: grid;
    row-gap: 2rem;
    @media (min-width: 1200px) {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
  }
  .status {
    font-size: 0.8rem;
    padding: 1px;
  }
  .green {
    border: solid 1px green;
    color: green;
  }
  .red {
    border: solid 1px red;
    color: red;
  }
  .info {
    margin-top: 1.25rem;
  }
  .date {
    color: var(--clr-primary-5);
    font-size: 1rem;
  }
`;

export default OrderDetailsPage;
