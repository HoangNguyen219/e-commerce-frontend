import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';
import authFetch from '../utils/authFetch';
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  GET_ADDRESSES,
  GET_ME,
  HANDLE_CLOSE_MODAL,
  HANDLE_SHOW_MODAL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  SET_EDIT_ADDRESS,
  SET_ERROR,
  SET_LOADING,
  TOGGLE_MEMBER,
  UNSET_EDIT,
} from '../actions';
import {
  ALERT_DANGER,
  ALERT_SUCCESS,
  address_url,
  auth_url,
  users_url,
} from '../utils/constants';

const user = localStorage.getItem('user');

export const initialState = {
  isMember: true,
  isLoading: false,
  isError: false,
  alert: { showAlert: false, alertType: '', alertText: '' },
  user: user ? JSON.parse(user) : null,
  addresses: [],
  address: {},
  isEditing: false,
  showModal: false,
  deleteFn: null,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    try {
      await myFetch.get(`${auth_url}/logout`);
    } catch (error) {}
    removeUserFromLocalStorage();
  };
  const myFetch = authFetch(logoutUser);

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
      const response = await myFetch.post(`${auth_url}/register`, currentUser);
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
      const response = await myFetch.post(`${auth_url}/login`, currentUser);
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

  const handleError = (error) => {
    let msg = 'Some thing went wrong, please try again';
    if (error.response) {
      if (error.response.status === 401) return;
      msg = error.response.data.msg;
    }
    displayAlert({
      alertType: ALERT_DANGER,
      alertText: msg,
    });
    setError(true);
  };

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await myFetch.get(`${users_url}/showMe`);
      dispatch({
        type: GET_ME,
        payload: { user: response.data.user },
      });
      addUserToLocalStorage(response.data.user);
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const getAddresses = async () => {
    setLoading(true);
    try {
      const response = await myFetch.get(`${address_url}/showAllMyAddresses`);
      dispatch({
        type: GET_ADDRESSES,
        payload: { addresses: response.data.addresses },
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const setEditAddress = (id) => {
    dispatch({ type: SET_EDIT_ADDRESS, payload: { id } });
  };

  const createAddress = async (data) => {
    setLoading(true);
    try {
      const response = await myFetch.post(address_url, data);
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Address created! Redirecting...',
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const editAddress = async (data) => {
    setLoading(true);
    try {
      const response = await myFetch.patch(
        `${address_url}/${state.address.id}`,
        data
      );
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Address updated! Redirecting...',
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const editUser = async (name) => {
    setLoading(true);
    try {
      const response = await myFetch.patch(`${users_url}/updateUser`, { name });
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'User updated! Redirecting...',
      });
      getCurrentUser();
      setError(false);
      addUserToLocalStorage();
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const changePassword = async (values) => {
    setLoading(true);
    try {
      const response = await myFetch.patch(
        `${users_url}/updateUserPassword`,
        values
      );
      displayAlert({
        alertType: ALERT_SUCCESS,
        alertText: 'Password updated! Redirecting...',
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const deleteAddress = async (id) => {
    setLoading(true);
    try {
      await myFetch.delete(`/${address_url}/${id}`);
      setError(false);

      getAddresses();
    } catch (error) {
      if (error.response.status === 401) return;
      handleError(error);
    }
    setLoading(false);
  };

  const handleShowModal = (callback, index) => {
    dispatch({ type: HANDLE_SHOW_MODAL, payload: { callback, index } });
  };

  const handleCloseModal = () => {
    dispatch({ type: HANDLE_CLOSE_MODAL });
  };

  const toggleMember = () => {
    dispatch({ type: TOGGLE_MEMBER });
  };

  const unsetEdit = () => {
    dispatch({ type: UNSET_EDIT });
  };

  const verifyToken = async ({ verificationToken, email }) => {
    setLoading(true);
    try {
      const { data } = await myFetch.post(`${auth_url}/verify-email`, {
        verificationToken,
        email,
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const { data } = await myFetch.post(`${auth_url}/forgot-password`, {
        email,
      });
      displayAlert({ alertText: data.msg, alertType: ALERT_SUCCESS });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const resetPassword = async ({ password, token, email }) => {
    setLoading(true);
    try {
      const { data } = await myFetch.post(`${auth_url}/reset-password`, {
        password,
        token,
        email,
      });
      displayAlert({
        alertText: `Success, redirecting to login page shortly`,
        alertType: ALERT_SUCCESS,
      });
      setError(false);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
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
        getAddresses,
        createAddress,
        setEditAddress,
        deleteAddress,
        handleShowModal,
        handleCloseModal,
        editAddress,
        unsetEdit,
        editUser,
        changePassword,
        verifyToken,
        forgotPassword,
        resetPassword,
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
