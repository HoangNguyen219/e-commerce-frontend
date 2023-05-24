import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { formatPrice } from '../utils/helpers';

const TopBar = () => {
  const { minFreeShippingAmount } = useCartContext();
  return (
    <Wrapper>
      <div>
        <p>
          Free Shipping for Orders Over {formatPrice(minFreeShippingAmount)}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-primary-1);
  p {
    margin-bottom: 0;
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;

export default TopBar;
