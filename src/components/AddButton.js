import React from 'react';
import { Link } from 'react-router-dom';

const AddButton = () => {
  return (
    <Link to="/me/add-address" className="btn btn-safe mg-left">
      Add address
    </Link>
  );
};

export default AddButton;
