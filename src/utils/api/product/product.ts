import { APIClient } from '../client';
import type {  } from './product.type';

export const getProducts = async ({ page, rowsPerPage }) => {
  try {
    const response = await APIClient.get(`${import.meta.env.VITE_BE_API_URL}/api/${import.meta.env.VITE_BE_API_VERSION}/products/?page=${page+1}&page_size=${rowsPerPage}`);

    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}