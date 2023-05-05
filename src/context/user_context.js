import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  TOGGLE_CART_ITEM_AMOUNT,
  TOGGLE_MEMBER,
} from '../actions';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import axios from 'axios';
import { auth_url } from '../utils/constants';
// import { useAuth0 } from '@auth0/auth0-react'

const initialState = {
  isMember: true,
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
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

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(`${auth_url}/register`, currentUser);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data.msg,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };

  const toggleMember = () => {
    dispatch({ type: TOGGLE_MEMBER });
  };

  return (
    <UserContext.Provider
      value={{ ...state, displayAlert, registerUser, toggleMember }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
