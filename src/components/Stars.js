import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, numOfReviews }) => {
  const tempStars = [];
  for (let i = 0; i < 5; i++) {
    const number = i + 0.5;
    tempStars.push(
      <span key={i}>
        {stars > i + 1 ? (
          <BsStarFill />
        ) : stars > number ? (
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
      <p className="reviews">({numOfReviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
