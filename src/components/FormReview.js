import React from 'react';
import { useState } from 'react';
import EmptyStars from './EmptyStars';
import { useUserContext } from '../context/user_context';
import { useProductsContext } from '../context/products_context';
import Alert from './Alert';
import { ALERT_DANGER } from '../utils/constants';

const FormReview = () => {
  const { displayAlert, alert } = useUserContext();
  const {
    product: { id },
    createReview,
  } = useProductsContext();

  const [review, setReview] = useState({ productId: id });

  const handleChange = (name, value) => {
    setReview((review) => {
      return {
        ...review,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    const { rating, comment } = review;
    if (!rating || !comment) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }
    createReview(review);
  };

  return (
    <div className="form">
      <h5>Give your Review:</h5>
      <div className="rating">
        <EmptyStars handleChange={handleChange} rating={review.rating} />
      </div>
      <textarea
        className="form-textarea form-row"
        name="comment"
        value={review.comment}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      {alert.showAlert && (
        <Alert alertText={alert.alertText} alertType={alert.alertType} />
      )}

      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FormReview;
