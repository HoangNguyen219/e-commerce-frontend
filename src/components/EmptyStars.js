import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStar } from 'react-icons/bs';

const EmptyStars = ({ handleChange, rating }) => {
  const [tempStars, setTempStars] = useState(rating);

  return (
    <Wrapper>
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const isClicked = index < tempStars;
          return (
            <span
              key={index}
              onClick={() => {
                setTempStars(index + 1);
                handleChange('rating', index + 1);
              }}
            >
              {isClicked ? <BsStarFill /> : <BsStar />}
            </span>
          );
        })}
      </div>
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
export default EmptyStars;
