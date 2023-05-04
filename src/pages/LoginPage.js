import React, { useState } from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import { FormRow } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const LoginPage = () => {
  const [values, setValues] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  return (
    <main>
      <PageHero title="register" />;
      <Wrapper className="page section section-center">
        <form className="form" onSubmit={onSubmit}>
          {/* name input */}
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          {/* email input */}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          {/* confirmPassword input */}
          <FormRow
            type="password"
            name="confirmPassword"
            labelText="confirm password"
            value={values.confirmPassword}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block">
            submit
          </button>
        </form>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  .form {
    max-width: 400px;
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default LoginPage;
