import { APIClient } from '../client';
import type {  } from './supplier.type';

export const getAllSuppliers = async () => {
  try {
    // NEED UPDATE
    const response = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/?page=1&page_size=50`);
    
    return response.data.results
  } catch (err) {
    console.error(err);
    throw err;  
  }
}

export const getSuppliers = async ({ page, rowsPerPage }) => {
  try {
    const response = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/?page=${page+1}&page_size=${rowsPerPage}`);
    
    return response.data
  } catch (err) {
    console.error(err);
    throw err;  
  }
}

export const postSuppliers = async (newSupplier) => {
  try {
    const response = await APIClient.post(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/`, newSupplier);

    return response.data.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const deleteSuppliers = async (supplier_id) => {
  try {
    const response = await APIClient.delete(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/${supplier_id}/`);

    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}