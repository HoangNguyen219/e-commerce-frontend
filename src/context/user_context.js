import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_MEMBER,
} from '../actions';
import axios from 'axios';
import { ALERT_DANGER, ALERT_SUCCESS, auth_url } from '../utils/constants';

const user = localStorage.getItem('user');

export const initialState = {
  isMember: true,
  isLoading: false,
  isError: false,
  alert: { showAlert: false, alertType: '', alertText: '' },
  user: user ? JSON.parse(user) : null,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = ({ alertText, alertType }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { alertText, alertType } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setLoading = (isLoading) => {
    dispatch({ type: SET_LOADING, payload: { isLoading } });
  };

  const setError = (isError) => {
    dispatch({ type: SET_ERROR, payload: { isError } });
  };

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const registerUser = async (currentUser) => {
    setLoading(true);
    try {
      const response = await axios.post(`${auth_url}/register`, currentUser);
      dispatch({
        type: REGISTER_USER_SUCCESS,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: response.data.msg,
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const loginUser = async (currentUser) => {
    setLoading(true);
    try {
      const response = await axios.post(`${auth_url}/login`, currentUser);
      const user = response.data.user;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
      });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Login successful! Redirecting...',
      });
      setError(false);
      addUserToLocalStorage(user);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    try {
      await axios.get(`${auth_url}/logout`);
    } catch (error) {}
    removeUserFromLocalStorage();
  };

  const handleError = (error) => {
    const msg = error.response.data.msg;
    displayAlert({
      alertType: ALERT_DANGER,
      alertText: msg,
    });
    setError(true);
  };

  const toggleMember = () => {
    dispatch({ type: TOGGLE_MEMBER });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        toggleMember,
        loginUser,
        logoutUser,
        setLoading,
        handleError,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
