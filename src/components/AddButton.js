import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const AddButton = ({ mgLeft }) => {
  const { unsetEdit } = useUserContext();
  return (
    <Link
      to="/me/add-address"
      className={mgLeft ? 'btn btn-safe mg-left' : 'btn btn-safe'}
      onClick={unsetEdit}
    >
      Add address
    </Link>
  );
};

export default AddButton;
