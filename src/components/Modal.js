import React from 'react';
import styled from 'styled-components';

const Modal = ({ handleCloseModal, handleDeleteItem }) => {
  return (
    <Wrapper>
      <div className="modal" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p>Delete this item?</p>
          <div className="btn-modal">
            <button className="btn btn-safe mg" onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteItem();
                handleCloseModal();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 2px solid var(--clr-primary-5);
    width: 60%;
    min-width: 400px;
  }

  .btn-modal {
    display: flex;
    justify-content: flex-end;
  }
  .mg {
    margin-right: 0.5rem;
  }
`;

export default Modal;
