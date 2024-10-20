import { APIClient } from '../client';

export const getAllSizeTypes = async () => {
  try {
    const response = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/sizetypes`);

    return response.data.data
  } catch (err) {
    console.error(err);
    throw err;  
  }
}

