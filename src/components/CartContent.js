import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import CartColumns from './CartColumns';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import CartTotal from './CartTotal';

const CartContent = () => {
  const { cart, clearCart, total, shipping_fee } = useCartContext();
  const { user } = useUserContext();

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={clearCart}
        >
          clear shopping cart
        </button>
      </div>
      <section className="total">
        <div>
          <CartTotal total={total} shipping_fee={shipping_fee} />
          {user ? (
            <Link to="/checkout" className="btn">
              process to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn">
              login
            </Link>
          )}
        </div>
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
    display: flex;
    justify-content: center;
    @media (min-width: 776px) {
      justify-content: flex-end;
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
`;

export default CartContent;
