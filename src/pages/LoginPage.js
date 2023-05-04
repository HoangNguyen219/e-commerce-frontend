import React, { useState } from 'react';
import styled from 'styled-components';
import { PageHero, FormRow, Alert } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isMember: true,
  showAlert: true,
};

const LoginPage = () => {
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  return (
    <main>
      <PageHero title={values.isMember ? 'login' : 'register'} />;
      <Wrapper className="page section section-center">
        <form className="form" onSubmit={onSubmit}>
          {values.showAlert && <Alert />}
          {/* name input */}
          {values.isMember || (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}

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
          {values.isMember || (
            <FormRow
              type="password"
              name="confirmPassword"
              labelText="confirm password"
              value={values.confirmPassword}
              handleChange={handleChange}
            />
          )}

          <button type="submit" className="btn btn-block">
            submit
          </button>
          <p>
            {values.isMember ? 'Not a member yet? ' : 'Already a member? '}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
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
    color: var(--clr-primary-5);
    cursor: pointer;
    letter-spacing: var(--spacing);
  }
`;

export default LoginPage;
