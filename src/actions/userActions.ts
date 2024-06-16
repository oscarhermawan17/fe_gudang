import { Dispatch } from 'redux';
import axios from 'axios';


import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../reducers/userReducers/userConstants.ts"

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      'https://dummyjson.com/auth/login',
      { username: email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } }; message: string };
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
}