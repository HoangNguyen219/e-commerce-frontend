import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Alert, FormRow, Loading } from '../components';
import { useUserContext } from '../context/user_context';
import { ALERT_DANGER, ALERT_SUCCESS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { alert, displayAlert, isLoading, resetPassword } = useUserContext();

  const query = useQuery();

  const handleChange = async (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      displayAlert({
        alertText: 'Please enter password',
        alertType: ALERT_DANGER,
      });
      return;
    }
    const token = query.get('token');
    const email = query.get('email');
    resetPassword({ token, email, password });
  };

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <Wrapper className="page-100 section section-center">
      <section>
        <form className="form" onSubmit={handleSubmit}>
          {alert.showAlert && (
            <Alert alertText={alert.alertText} alertType={alert.alertType} />
          )}
          <h4>reset password</h4>
          {/* single form row */}
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
          />
          {isLoading && <Loading />}

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'New Password'}
          </button>
        </form>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

export default ResetPasswordForm;
