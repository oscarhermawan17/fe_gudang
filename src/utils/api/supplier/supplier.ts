import { APIClient } from '../client';

import type { PaginationItemType, CreatingSupplierType } from '@/utils/types'


export const getAllSuppliers = async () => {
  try {
    // NEED UPDATE
    const response = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/?page=1&page_size=50`);

    return response.data.results.data
  } catch (err) {
    console.error(err);
    throw err;  
  }
}

export const getSuppliers = async ({ page, rowsPerPage }: PaginationItemType) => {
  try {
    const response = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/?page=${page+1}&page_size=${rowsPerPage}`);

    return response.data
  } catch (err) {
    console.error(err);
    throw err;  
  }
}

export const postSuppliers = async (newSupplier: CreatingSupplierType) => {
  try {
    const response = await APIClient.post(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/`, newSupplier);

    return response.data.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const updateSupplier = async (supplier) => {
  try {
    const response = await APIClient.put(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/${supplier.supplier_id}/`, supplier);
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const deleteSuppliers = async (supplier_id: string) => {
  try {
    const response = await APIClient.delete(`/api/${import.meta.env.VITE_BE_API_VERSION}/suppliers/${supplier_id}/`);

    return response.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}