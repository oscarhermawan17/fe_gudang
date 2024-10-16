export type LoginResponse = {
  user: object;
  token: string;
  roles: string[];
};

export type LoginPayload = {
  username: string;
  password: string;
};