import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useUserContext } from '../context/user_context';

const Address = ({ addresses }) => {
  const {
    setEditAddress,
    deleteAddress,
    showModal,
    handleCloseModal,
    deleteFn,
    handleShowModal,
  } = useUserContext();

  return (
    <>
      {showModal && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleDeleteItem={() => {
            deleteFn.callback(deleteFn.index);
          }}
          message="Deleting this item?"
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addresses &&
            addresses.map((addr) => {
              const {
                id,
                name,
                mobile,
                address,
                city,
                state,
                country,
                isDefault,
              } = addr;
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{mobile}</td>
                  <td>
                    {address}, {city}, {state}, {country}
                  </td>
                  <td>{isDefault && <span>Default</span>}</td>
                  <td>
                    <div className="actions">
                      <Link
                        to="/me/add-address"
                        className="btn btn-safe"
                        onClick={() => setEditAddress(id)}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleShowModal(deleteAddress, id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Address;
