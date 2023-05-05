import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  TOGGLE_MEMBER,
} from '../actions';
import { ALERT_DANGER, ALERT_SUCCESS } from '../utils/constants';

const user_reducer = (state, action) => {
  if (action.type === TOGGLE_MEMBER) {
    return {
      ...state,
      isMember: !state.isMember,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: ALERT_DANGER,
      alertText: action.payload,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_SUCCESS,
      alertText: action.payload,
      isMember: true,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_DANGER,
      alertText: action.payload,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_SUCCESS,
      alertText: 'Login successful! Redirecting...',
      user: action.payload,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: ALERT_DANGER,
      alertText: action.payload,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default user_reducer;
