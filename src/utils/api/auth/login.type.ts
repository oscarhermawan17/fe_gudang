export type LoginResponse = {
  user: object;
  token: string;
  roles: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
};