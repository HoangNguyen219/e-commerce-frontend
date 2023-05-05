import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  TOGGLE_MEMBER,
} from '../actions';
import axios from 'axios';
import { auth_url } from '../utils/constants';
// import { useAuth0 } from '@auth0/auth0-react'

const user = localStorage.getItem('user');

export const initialState = {
  isMember: true,
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (messaage) => {
    dispatch({ type: DISPLAY_ALERT, payload: messaage });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(`${auth_url}/register`, currentUser);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data.msg,
      });
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(`${auth_url}/login`, currentUser);
      const user = response.data.user;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
      });
      addUserToLocalStorage(user);
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    try {
      await axios.get(`${auth_url}/logout`);
    } catch (error) {}
    removeUserFromLocalStorage();
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
