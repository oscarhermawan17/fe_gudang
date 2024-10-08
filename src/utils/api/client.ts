import axios from 'axios';
import { Cookies } from 'react-cookie';

export const APIClient = axios.create({
  baseURL: import.meta.env.VITE_BE_API_URL || 'http://localhost:8000',
});

APIClient.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});