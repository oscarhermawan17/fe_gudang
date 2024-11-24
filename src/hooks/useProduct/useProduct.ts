import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getProducts, createProduct, deleteProduct } from '@/utils/api/product'
import type { PaginationItemType  } from '@/utils/types/pagination.type';

const useGetProducts = ({ page, rowsPerPage }: PaginationItemType) => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['products', page, rowsPerPage], 
    queryFn: () => getProducts({ page, rowsPerPage }),
    initialData: {
      products: [],
      page: 1,
      count: 0,
      isLoading: true
    },
  });

  return {
    products: data?.results?.data || [],
    page: data?.page || 1,
    count: data?.count || 0,
    error,
    isLoading,
    message: data?.results?.message
  };
}

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });
};


export { useGetProducts, useCreateProduct, useDeleteProduct }