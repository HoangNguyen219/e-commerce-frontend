import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { CartTotal, Alert } from '../components';

import { PageHero, AddressRadio, AddButton, Loading } from '../components';
import { formatPrice } from '../utils/helpers';
import { ALERT_DANGER, ALERT_SUCCESS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, shippingFee, createOrder, total } = useCartContext();
  const { addresses, getAddresses, isLoading, alert, displayAlert } =
    useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setValues((values) => {
        return {
          ...values,
          addressId: defaultAddress.id,
        };
      });
    }
  }, [addresses]);

  const [values, setValues] = useState({
    cartItems: cart,
    paymentMethod: 'cod',
  });
  const handleInput = (e) => {
    let { name, value } = e.target;
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { cartItems, addressId } = values;
    if (cartItems.length === 0) {
      displayAlert({
        alertType: ALERT_DANGER,
        alertText: 'Your cart is empty!',
      });
      return;
    }
    if (!addressId) {
      displayAlert({
        alertType: ALERT_DANGER,
        alertText: 'Please choose an shipping address!',
      });
      return;
    }
    createOrder(values);
  };

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate(`/me`);
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        <form className="section section-center" onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <h2>Shipping Address</h2>
              {addresses &&
                addresses.map((addr) => {
                  return (
                    <AddressRadio
                      key={addr.id}
                      addr={addr}
                      handleInput={handleInput}
                    />
                  );
                })}
              <AddButton />
            </div>
            <div>
              <div className="checkout-summary">
                <h2>Cart Total</h2>
                <div className="checkout-content">
                  <h3>Products</h3>
                  {cart.map((item) => {
                    const { name, color, price, amount } = item;
                    return (
                      <p className="item" key={item.id}>
                        {name} ({color}) x {amount}
                        <span>{formatPrice(price * amount)} </span>
                      </p>
                    );
                  })}
                </div>
                <CartTotal total={total} shippingFee={shippingFee} />
              </div>
              <div className="checkout-payment">
                <h2>Payment Methods</h2>
                <div className="payment-methods">
                  <input
                    type="radio"
                    value="cod"
                    id="payment-2"
                    name="paymentMethod"
                    defaultChecked
                    onChange={handleInput}
                  />
                  <label htmlFor="payment-2">Cash on Delivery</label>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, alias!
                  </p>
                  <input
                    type="radio"
                    value="paypal"
                    id="payment-1"
                    name="paymentMethod"
                    onChange={handleInput}
                  />
                  <label htmlFor="payment-1">Paypal</label>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tenetur dolor maiores, veniam commodi cum ipsam.
                  </p>
                </div>
              </div>
              {alert.showAlert && (
                <Alert
                  alertText={alert.alertText}
                  alertType={alert.alertType}
                />
              )}
              {isLoading && <Loading />}
              <div className="checkout-btn">
                <button type="submit" className="btn" disabled={isLoading}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .row {
    display: grid;
    gap: 4rem;
  }
  .checkout-summary {
    margin-bottom: 2rem;
  }

  .checkout-content,
  .payment-methods {
    background-color: var(--clr-primary-5);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
    margin-bottom: 1rem;
    color: white;
    p {
      color: white;
    }
    .item {
      display: grid;
      grid-template-columns: 1fr auto;
    }
  }

  .checkout-btn {
    .btn {
      width: 100%;
      margin-top: 1rem;
      text-align: center;
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .row {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
export default CheckoutPage;
