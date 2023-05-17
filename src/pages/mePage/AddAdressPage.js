import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { useUserContext } from '../../context/user_context';
import { FormRow, FormRowSelect, Alert, Loading } from '../../components';
import styled from 'styled-components';
import { ALERT_DANGER, ALERT_SUCCESS } from '../../utils/constants';
import { toInt } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AddAdressPage = () => {
  const {
    isEditing,
    isLoading,
    displayAlert,
    alert,
    createAddress,
    address,
    editAddress,
  } = useUserContext();
  const navigate = useNavigate();

  const [values, setValues] = useState({ ...address });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    setCountryList(
      Country.getAllCountries().map((country) => {
        const { name, isoCode } = country;
        return { name, id: isoCode };
      })
    );
    setValues((values) => {
      return { ...values, country: 'AF', state: 'BDS', city: 'Ashkāsham' };
    });
  }, []);

  useEffect(() => {
    setStateList(
      State.getStatesOfCountry(values.country).map((state) => {
        const { name, isoCode } = state;
        return { name, id: isoCode };
      })
    );
  }, [values.country]);

  useEffect(() => {
    setCityList(
      City.getCitiesOfState(values.country, values.state).map((city) => {
        const { name } = city;
        return { name, id: name };
      })
    );
  }, [values.state]);

  useEffect(() => {
    if (stateList.length > 0) {
      setValues((values) => {
        return { ...values, state: stateList[0].id };
      });
    }
  }, [stateList]);

  useEffect(() => {
    if (cityList.length > 0) {
      setValues((values) => {
        return { ...values, city: cityList[0].id };
      });
    }
  }, [cityList]);

  const handleInput = (e) => {
    let { name, value } = e.target;
    if (name === 'isDefault') {
      value = e.target.checked;
    }
    setValues((values) => {
      return { ...values, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, mobile, country, state, city, address, isDefault } = values;
    if (!name || !mobile || !address) {
      displayAlert({
        alertType: ALERT_DANGER,
        alertText: 'Please provide all values',
      });
      return;
    }
    if (toInt(mobile) === -1) {
      displayAlert({
        alertText: 'Please provide a valid phone number',
        alertType: ALERT_DANGER,
      });
      return;
    }

    country = Country.getCountryByCode(country).name;
    state = State.getStateByCode(state).name;

    const data = { name, mobile, country, state, city, address, isDefault };

    if (isEditing) {
      return editAddress(data);
    }

    createAddress(data);
  };

  useEffect(() => {
    if (alert.alertType === ALERT_SUCCESS) {
      setTimeout(() => {
        navigate(`/me/addresses`);
      }, 2000);
    }
  }, [alert.alertType, navigate]);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit' : 'add'} address</h3>
        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={values.name}
            handleChange={handleInput}
          />
          {/* mobile */}
          <FormRow
            labelText="Phone number"
            type="text"
            name="mobile"
            value={values.mobile}
            handleChange={handleInput}
          />
          {/* country */}
          <FormRowSelect
            labelText="country"
            name="country"
            value={values.country}
            handleChange={handleInput}
            list={countryList}
          />
          {/* state */}
          <FormRowSelect
            labelText="state"
            name="state"
            value={values.state}
            handleChange={handleInput}
            list={stateList}
          />
          {/* city */}
          <FormRowSelect
            labelText="city"
            name="city"
            value={values.city}
            handleChange={handleInput}
            list={cityList}
          />
          {/* address */}
          <FormRow
            type="text"
            name="address"
            labelText="address"
            value={values.address}
            handleChange={handleInput}
          />
        </div>

        <div className="form-row shipping">
          <label htmlFor="isDefault">Set as default address</label>
          <input
            type="checkbox"
            name="isDefault"
            id="isDefault"
            onChange={handleInput}
            checked={values.isDefault}
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

const Wrapper = styled.div`
  border-radius: var(--radius);
  width: 100%;
  background: var(--clr-white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--light-shadow);
  h3 {
    margin-top: 0;
  }

  select {
    max-height: 200px;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 1rem;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 2.5rem;
    font-size: 1rem;
    width: fit-content;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default AddAdressPage;
