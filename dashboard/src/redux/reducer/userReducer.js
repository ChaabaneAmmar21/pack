import {

  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
 


} from '../constants/userConstant';

// LOGIN
export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = { }, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: payload };
    case USER_LIST_FAIL:
      return { loading: false, error: payload };
    case USER_LIST_RESET:
      return {users:[]};

    default:
      return state;
  }
};
