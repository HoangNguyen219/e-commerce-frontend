import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../../context/user_context';
import { FormRow, Alert, Loading } from '../../components';
import { ALERT_DANGER, ALERT_SUCCESS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const EditAccountPage = () => {
  const navigate = useNavigate();

  const { isLoading, alert, displayAlert, user, editUser } = useUserContext();

  const [name, setName] = useState(user.name);

  const handleInput = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      displayAlert({
        alertText: 'Please provide all values',
        alertType: ALERT_DANGER,
      });
      return;
    }
    editUser(name);
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
        <h3>Edit Account</h3>
        <div>
          {/* name */}
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={name}
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

export default EditAccountPage;
