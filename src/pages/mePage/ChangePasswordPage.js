import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { FormRow, Alert, Loading } from '../../components';
import { ALERT_DANGER, ALERT_SUCCESS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const { isLoading, alert, displayAlert, changePassword } = useUserContext();

  const [values, setValues] = useState({});

  const handleInput = (e) => {
    const { value, name } = e.target;
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = values;
    if (!oldPassword || !newPassword || !confirmPassword) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      displayAlert({
        alertText: 'Passwords do not match',
        alertType: ALERT_DANGER,
      });
      return;
    }
    changePassword(values);
  };

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate(`/me/account`);
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <Wrapper>
      <form className="form">
        <h3>Change Password</h3>
        <div>
          {/* password */}
          <FormRow
            type="password"
            name="oldPassword"
            disabled={isLoading}
            labelText="password"
            value={values.oldPassword}
            handleChange={handleInput}
          />
        </div>

        <div>
          {/* newPassword */}
          <FormRow
            type="password"
            name="newPassword"
            labelText="new Password"
            disabled={isLoading}
            value={values.newPassword}
            handleChange={handleInput}
          />
        </div>

        <div>
          {/* confirmPassword */}
          <FormRow
            type="password"
            name="confirmPassword"
            labelText="confirm Password"
            disabled={isLoading}
            value={values.confirmPassword}
            handleChange={handleInput}
          />
        </div>

        {alert.showAlert && (
          <Alert alertText={alert.alertText} alertType={alert.alertType} />
        )}

        {isLoading && <Loading />}
        <button
          type="submit"
          className="btn btn-block submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          submit
        </button>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .form {
    width: auto;
  }
`;

export default ChangePasswordPage;
