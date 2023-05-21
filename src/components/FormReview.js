import React, { useEffect } from 'react';
import { useState } from 'react';
import EmptyStars from './EmptyStars';
import { useUserContext } from '../context/user_context';
import { useProductsContext } from '../context/products_context';
import Alert from './Alert';
import { ALERT_DANGER, ALERT_SUCCESS } from '../utils/constants';

const FormReview = ({ rating, comment, id, setShowEditForm }) => {
  const { displayAlert, alert, isLoading } = useUserContext();
  const { createReview, updateReview } = useProductsContext();

  const [review, setReview] = useState({ comment, rating });

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
    if (id) {
      return updateReview({ review, id });
    }
    createReview(review);
  };

  useEffect(() => {
    if (id && alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        setShowEditForm(false);
      }, 2000);
    }
  }, [alert.alertType === ALERT_SUCCESS]);

  return (
    <div className="form">
      <h5>{id ? 'Edit' : 'Give'} your Review:</h5>
      <div className="rating">
        <EmptyStars handleChange={handleChange} rating={rating} />
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

      <button className="btn" onClick={handleSubmit} disabled={isLoading}>
        Submit
      </button>
    </div>
  );
};

export default FormReview;
