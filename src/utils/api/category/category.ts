import { APIClient } from '../client';
import type {  } from './category.type';

export const getAllCategories = async () => {
  try {
    const response = await APIClient.get(`${import.meta.env.VITE_BE_API_URL}/api/${import.meta.env.VITE_BE_API_VERSION}/categories`);
    return response.data.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}