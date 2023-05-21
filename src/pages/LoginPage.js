import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PageHero, FormRow, Alert, Loading } from '../components';
import { useUserContext } from '../context/user_context';
import { useNavigate } from 'react-router-dom';
import { ALERT_DANGER } from '../utils/constants';
import { Link } from 'react-router-dom';

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
    alert,
    displayAlert,
    registerUser,
    isMember,
    toggleMember,
    loginUser,
    user,
  } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = values;
    if (
      !email ||
      !password ||
      (!isMember && !name) ||
      (!isMember && !confirmPassword)
    ) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }
    if (!isMember && password !== confirmPassword) {
      displayAlert({
        alertText: 'Passwords do not match',
        alertType: ALERT_DANGER,
      });
      return;
    }

    const currentUser = { name, email, password, confirmPassword };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/me');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <main>
      <PageHero title={isMember ? 'login' : 'register'} />;
      <Wrapper className="page section section-center">
        <form className="form" onSubmit={onSubmit}>
          {alert.showAlert && (
            <Alert alertText={alert.alertText} alertType={alert.alertType} />
          )}
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

          {isLoading && <Loading />}

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isMember ? 'Login' : 'Register'}
          </button>
          <p>
            {isMember ? 'Not a member yet? ' : 'Already a member? '}
            <button type="button" onClick={toggleMember} className="member-btn">
              {isMember ? 'Register' : 'Login'}
            </button>
          </p>
          {isMember && (
            <p>
              Forgot your password?{' '}
              <Link to="/forgot-password" className="reset-link member-btn">
                Reset Password
              </Link>
            </p>
          )}
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
  .reset-link {
    margin-top: 0.25rem;
    font-size: 0.9rem;
  }
`;

export default LoginPage;
