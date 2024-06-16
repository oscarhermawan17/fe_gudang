// src/types.ts

export interface UserInfo {
  username: string;
  token: string;
}

export interface UserLoginState {
  userInfo?: UserInfo;
}

export interface AppState {
  userLogin: UserLoginState;
}
