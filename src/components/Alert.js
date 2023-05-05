import React from 'react';

const Alert = ({ alertText, alertType }) => {
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
