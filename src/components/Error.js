import React from 'react';
const Error = ({ center }) => {
  return (
    <div
      className={
        center ? 'section section-center text-center' : 'section section-center'
      }
    >
      <h4>there was an error...</h4>
    </div>
  );
};

export default Error;
