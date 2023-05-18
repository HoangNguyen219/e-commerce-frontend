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
import { initialState } from '../context/user_context';

const user_reducer = (state, action) => {
  if (action.type === TOGGLE_MEMBER) {
    return {
      ...state,
      isMember: !state.isMember,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    const { alertText, alertType } = action.payload;
    return {
      ...state,
      alert: {
        showAlert: true,
        alertType,
        alertText,
      },
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      alert: {
        showAlert: false,
        alertType: '',
        alertText: '',
      },
    };
  }

  if (action.type === SET_LOADING) {
    const { isLoading } = action.payload;
    return {
      ...state,
      isLoading,
    };
  }

  if (action.type === UNSET_EDIT) {
    return {
      ...state,
      isEditing: false,
      address: {},
    };
  }

  if (action.type === SET_ERROR) {
    const { isError } = action.payload;
    return {
      ...state,
      isError,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isMember: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === GET_ADDRESSES) {
    const { addresses } = action.payload;
    return {
      ...state,
      addresses,
    };
  }

  if (action.type === GET_ME) {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
    };
  }

  if (action.type === SET_EDIT_ADDRESS) {
    const address = state.addresses.find(
      (address) => address.id === action.payload.id
    );
    return {
      ...state,
      isEditing: true,
      address,
    };
  }

  if (action.type === HANDLE_SHOW_MODAL) {
    const { callback, index } = action.payload;
    return {
      ...state,
      showModal: true,
      deleteFn: { callback, index },
    };
  }

  if (action.type === HANDLE_CLOSE_MODAL) {
    return {
      ...state,
      showModal: false,
      deleteFn: null,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default user_reducer;
