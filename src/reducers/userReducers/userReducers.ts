import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "./userConstants.ts"

interface UserLoginRequestAction {
  type: string
}

interface UserLoginSuccessAction {
  type: string
  payload: any;
}

interface UserLoginFailAction {
  type: string
  payload: any;
}

interface UserLogoutAction {
  type: string
}

export type UserActionTypes =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailAction
  | UserLogoutAction;

interface UserState {
  loading?: boolean;
  userInfo?: any; // Replace 'any' with the actual type of your user info
  error?: any; // Replace 'any' with the actual type of your error
}

const initialState: UserState = {};

export const userLoginReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: (action as UserLoginSuccessAction).payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: (action as UserLoginFailAction).payload };
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
