import { APIClient } from '../client';
import type {  } from './product.type';

export const getProducts = async () => {
  try {
    const respons = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers`);

    return respons.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}