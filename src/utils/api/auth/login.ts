import { APIClient } from '../client';
import type { LoginPayload, LoginResponse } from './login.type';

export const userLogin = async (value: LoginPayload) => {
  try {
    const respons = await APIClient.post<LoginResponse>(`/api/${import.meta.env.VITE_BE_API_VERSION}/auth/login`, value);
    
    return respons.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};