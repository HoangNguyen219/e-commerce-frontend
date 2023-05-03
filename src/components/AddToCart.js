import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';
const AddToCart = ({ product }) => {
  // add to cart
  const { addToCart } = useCartContext();
  const { id, colorStocks } = product;
  const [mainColor, setMainColor] = useState(colorStocks[0].color);
  const [amount, setAmount] = useState(1);
  const [stock, setStock] = useState(colorStocks[0].stock);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };
  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {colorStocks.map((colorStock, index) => {
            const color = colorStock.color;
            const stock = colorStock.stock;
            let displayColor = color;
            if (color === 'white') {
              displayColor = '#eeedec';
            }
            return (
              <button
                key={index}
                style={{ background: displayColor }}
                className={`${stock ? 'color-btn' : 'color-btn disabled'}`}
                data-title={`${stock ? color : color + ': Out of stock'}`}
                onClick={() => {
                  setMainColor(color);
                  setStock(stock);
                  setAmount(1);
                }}
                disabled={stock ? null : true}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <p className="info">
        <span>Stock :</span>
        {stock}
      </p>
      <div className="btn-container">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />

        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
    :hover::before {
      content: attr(data-title);
      position: absolute;
      top: -26px;
      display: inline-block;
      padding: 3px 6px;
      border-radius: 2px;
      background: #444857;
      color: #fff;
      font-size: 12px;
      white-space: nowrap;
      text-transform: capitalize;
      font-weight: normal !important;
    }
  }

  .disabled {
    cursor: not-allowed;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
