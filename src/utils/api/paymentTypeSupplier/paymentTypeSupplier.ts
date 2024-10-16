import { APIClient } from '../client';
import type {  } from './paymentTypeSupplier.type';

export const getAllPaymentTypeSuppliers = async () => {
  try {
    const respons = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/payment-type-suppliers/`);

    return respons.data.data
  } catch (err) {
    console.error(err);
    throw err;
  }
}