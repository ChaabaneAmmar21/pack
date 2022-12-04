import axios from 'axios';
import {toast} from 'react-toastify'
import {
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCES,
  USER_LOGOUT,
} from '../constants/userConstant';


export const login = (email, password) => async (dispatch) => {
  const ToastObject={
    pauseOnFocusLoss:false,
    draggable:false,
    PauseOnHover:true,
    autoClose:2000,
  }
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/user/login', { email, password }, config);
    if (!data.isAdmin) {
      toast.error("you are Not admin",ToastObject);
      dispatch({
        type: USER_LOGIN_FAIL,})

      
    } else {
      dispatch({ type: USER_LOGIN_SUCCES, payload: data });

    }
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });


  // document.location.href="/login"
};
