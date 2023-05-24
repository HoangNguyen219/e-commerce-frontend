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
  const [countRender, setCountRender] = useState(0);

  useEffect(() => {
    setCountryList(
      Country.getAllCountries().map((country) => {
        const { name, isoCode } = country;
        return { name, id: isoCode };
      })
    );
    if (!isEditing) {
      setValues((values) => {
        return {
          ...values,
          countryCode: 'AF',
          stateCode: 'BDS',
          city: 'Ashkāsham',
        };
      });
    }
  }, []);

  useEffect(() => {
    setStateList(
      State.getStatesOfCountry(values.countryCode).map((state) => {
        const { name, isoCode } = state;
        return { name, id: isoCode };
      })
    );
  }, [values.countryCode]);

  useEffect(() => {
    setCityList(
      City.getCitiesOfState(values.countryCode, values.stateCode).map(
        (city) => {
          const { name } = city;
          return { name, id: name };
        }
      )
    );
  }, [values.stateCode]);

  useEffect(() => {
    setCountRender((countRender) => countRender + 1);
    if (countRender > 2 && stateList.length > 0) {
      setValues((values) => {
        return { ...values, stateCode: stateList[0].id };
      });
    }
  }, [stateList]);

  useEffect(() => {
    setCountRender((countRender) => countRender + 1);

    if (countRender > 2 && cityList.length > 0) {
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
    const { name, mobile, countryCode, stateCode, city, address, isDefault } =
      values;
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

    const country = Country.getCountryByCode(countryCode).name;
    const state = State.getStateByCodeAndCountry(stateCode, countryCode)
      ? State.getStateByCodeAndCountry(stateCode, countryCode).name
      : stateCode;

    const data = {
      name,
      mobile,
      country,
      countryCode,
      state,
      stateCode,
      city,
      address,
      isDefault,
    };

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
            disabled={isLoading}
            value={values.name}
            handleChange={handleInput}
          />
          {/* mobile */}
          <FormRow
            labelText="Phone number"
            type="text"
            name="mobile"
            disabled={isLoading}
            value={values.mobile}
            handleChange={handleInput}
          />
          {/* country */}
          <FormRowSelect
            labelText="country"
            name="countryCode"
            disabled={isLoading}
            value={values.countryCode}
            handleChange={handleInput}
            list={countryList}
          />
          {/* state */}
          {stateList.length > 0 ? (
            <FormRowSelect
              labelText="state"
              name="stateCode"
              disabled={isLoading}
              value={values.stateCode}
              handleChange={handleInput}
              list={stateList}
            />
          ) : (
            <FormRow
              type="text"
              name="stateCode"
              labelText="state"
              disabled={isLoading}
              value={values.stateCode}
              handleChange={handleInput}
            />
          )}

          {/* city */}
          {cityList.length > 0 ? (
            <FormRowSelect
              labelText="city"
              name="city"
              disabled={isLoading}
              value={values.city}
              handleChange={handleInput}
              list={cityList}
            />
          ) : (
            <FormRow
              type="text"
              name="city"
              labelText="city"
              disabled={isLoading}
              value={values.city}
              handleChange={handleInput}
            />
          )}

          {/* address */}
          <FormRow
            type="text"
            name="address"
            labelText="address"
            disabled={isLoading}
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
            disabled={isLoading}
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
