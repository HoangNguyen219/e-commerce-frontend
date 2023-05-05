import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHero, FormRow, Alert } from '../components';
import { useUserContext } from '../context/user_context';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const LoginPage = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const {
    isLoading,
    showAlert,
    alertType,
    alertText,
    displayAlert,
    registerUser,
    isMember,
    toggleMember,
  } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, isMember } = values;
    if (
      !email ||
      !password ||
      (!isMember && !name) ||
      (!isMember && !confirmPassword)
    ) {
      displayAlert('Please provide all value');
      return;
    }
    if (password !== confirmPassword) {
      displayAlert('Passwords do not match');
    }

    const currentUser = { name, email, password, confirmPassword };
    if (isMember) {
    } else {
      registerUser(currentUser);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <PageHero title={isMember ? 'login' : 'register'} />;
      <Wrapper className="page section section-center">
        <form className="form" onSubmit={onSubmit}>
          {showAlert && <Alert alertText={alertText} alertType={alertType} />}
          {/* name input */}
          {isMember || (
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
          {isMember || (
            <FormRow
              type="password"
              name="confirmPassword"
              labelText="confirm password"
              value={values.confirmPassword}
              handleChange={handleChange}
            />
          )}

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isMember ? 'Login' : 'Register'}
          </button>
          <p>
            {isMember ? 'Not a member yet? ' : 'Already a member? '}
            <button type="button" onClick={toggleMember} className="member-btn">
              {isMember ? 'Register' : 'Login'}
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
