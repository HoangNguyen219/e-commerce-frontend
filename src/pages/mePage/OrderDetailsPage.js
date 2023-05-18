import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useCartContext } from '../../context/cart_context';
import { CartColumns, CartTotal, OrderItem } from '../../components';
const OrderDetailsPage = () => {
  const { id } = useParams();
  const { getSingleOrder, order } = useCartContext();
  const {
    shippingFee,
    subtotal,
    total,
    orderItems,
    processStatus,
    paymentStatus,
    addressId: addr,
    paymentMethod,
    createdAt,
  } = order;

  useEffect(() => {
    getSingleOrder(id);
  }, [id]);
  return (
    <Wrapper className="">
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

          <hr />
          <div className="info">
            <h5>
              Payment Method: <span>{paymentMethod}</span>
            </h5>

            <h5>
              Processing Status:{' '}
              <span
                className={
                  processStatus === 'pending' || 'canceled' || 'returned'
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
                  paymentStatus === 'unpaid' ? 'status red' : 'status green'
                }
              >
                {paymentStatus}
              </span>
            </h5>
          </div>
        </div>

        <CartTotal total={subtotal} shipping_fee={shippingFee} />
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
  .total {
    margin-top: 3rem;
    display: grid;
    @media (min-width: 776px) {
      grid-template-columns: 1fr auto;
      column-gap: 3rem;
    }
    .btn {
      width: 100%;
      margin-top: 1rem;
      text-align: center;
      font-weight: 700;
    }
    div {
      width: 400px;
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
`;

export default OrderDetailsPage;
