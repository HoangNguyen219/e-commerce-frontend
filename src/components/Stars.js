import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars }) => {
  const tempStars = [];
  for (let i = 0; i < 5; i++) {
    tempStars.push(
      <span key={i}>
        {stars >= i + 1 ? (
          <BsStarFill />
        ) : stars >= i + 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  }
  return (
    <Wrapper>
      <div className="stars">{tempStars}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
`;
export default Stars;
