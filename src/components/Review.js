import React, { useState } from 'react';
import styled from 'styled-components';
import Stars from './Stars';
import FormReview from './FormReview';
import { useUserContext } from '../context/user_context';
import { useProductsContext } from '../context/products_context';
import Modal from './Modal';

const Review = ({ reviews }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const {
    user: userLogin,
    handleShowModal,
    showModal,
    handleCloseModal,
    deleteFn,
  } = useUserContext();
  const { deleteReview } = useProductsContext();
  let isReviewed = false;
  if (userLogin) {
    isReviewed = reviews.find((review) => {
      return review.userId.id === userLogin.id;
    });
  }

  const isDisplayForm = userLogin && !isReviewed;

  return (
    <Wrapper>
      {showModal && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleDeleteItem={() => {
            deleteFn.callback(deleteFn.index);
          }}
          message="Deleting this item?"
        />
      )}
      <div className="section-center">
        <h3>Product rating</h3>

        {isDisplayForm && <FormReview />}

        {reviews.map((review) => {
          const { userId: user, createdAt, comment, rating, id } = review;
          let isOwner = false;
          if (userLogin) {
            isOwner = user.id === userLogin.id;
          }

          return (
            <div className="reviews-submitted" key={id}>
              <div className="reviewer">
                {user && user.name} -{' '}
                <span>{new Date(createdAt).toLocaleString()}</span>
              </div>
              <Stars stars={rating} />
              <p>{comment}</p>
              {isOwner && (
                <div className="actions">
                  <button
                    className="btn btn-safe"
                    onClick={() => setShowEditForm(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowModal(deleteReview, id)}
                  >
                    Delete
                  </button>
                </div>
              )}
              {isOwner && showEditForm && (
                <FormReview
                  rating={rating}
                  comment={comment}
                  id={id}
                  setShowEditForm={setShowEditForm}
                />
              )}
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
