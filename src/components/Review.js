import React from 'react';
import styled from 'styled-components';
import Stars from './Stars';
import FormReview from './FormReview';

const Review = ({ reviews }) => {
  return (
    <Wrapper>
      <div className="section section-center">
        <h3>Product rating</h3>

        <FormReview />

        {reviews.map((review) => {
          const { userId: user, createdAt, comment, rating, id } = review;
          return (
            <div className="reviews-submitted" key={id}>
              <div className="reviewer">
                {user && user.name} -{' '}
                <span>{new Date(createdAt).toLocaleString()}</span>
              </div>
              <Stars stars={rating} />
              <p>{comment}</p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .reviews-submitted:not(:last-child) {
    margin-bottom: 2rem;
    p {
      margin: 0.5em 0;
    }
  }
  .reviewer {
    color: var(--clr-primary-5);
    font-size: 1.2rem;
    font-weight: 600;

    span {
      color: var(--clr-grey-2);
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
  .rating {
    margin-bottom: 1rem;
  }
  .form {
    width: 100%;
    max-width: 100%;
    margin: 2rem 0;
  }
`;

export default Review;
