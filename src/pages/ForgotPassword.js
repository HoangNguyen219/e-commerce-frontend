import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { Alert, FormRow, Loading } from '../components';
import { ALERT_DANGER } from '../utils/constants';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { alert, isLoading, forgotPassword, displayAlert } = useUserContext();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      displayAlert({
        alertText: 'Please provide email',
        alertType: ALERT_DANGER,
      });
      return;
    }
    forgotPassword(email);
  };
  return (
    <Wrapper className="page-100 section section-center">
      <section>
        <form className="form" onSubmit={handleSubmit}>
          {alert.showAlert && (
            <Alert alertText={alert.alertText} alertType={alert.alertType} />
          )}
          <h4>Forgot password</h4>
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />
          {isLoading && <Loading />}
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Get Reset Password Link'}
          </button>
          <p>
            Already a have an account?
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--clr-primary-5);
    cursor: pointer;
  }
`;

export default ForgotPassword;
