import React from 'react';
import styled from 'styled-components';

const AddressRadio = ({ addr, handleInput }) => {
  return (
    <Wrapper>
      <div>
        <input
          type="radio"
          value={addr.id}
          id={addr.id}
          name="addressId"
          defaultChecked={addr.isDefault ? true : false}
          onChange={handleInput}
        />
        <label htmlFor={addr.id}>{addr.name}</label>
      </div>
      <div className="payment-content">
        <p>
          Mobile: {addr.mobile} <br />
          Address: {addr.address} - {addr.city} - {addr.state} - {addr.country}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .radio {
    margin-bottom: 0.5rem;
  }
`;

export default AddressRadio;
