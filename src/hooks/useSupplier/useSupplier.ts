import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAllSuppliers, getSuppliers, postSuppliers, deleteSuppliers } from '@/utils/api/supplier'
import type { PaginationItemType } from '@/utils/types/pagination.type';

const useGetAllSuppliers = () => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['allSuppliers'], 
    queryFn: () => getAllSuppliers(),
    initialData: []
  });

  return {
    allSuppliers: data,
    error,
    isLoading,
  };
}

const useGetSuppliers = ({ page, rowsPerPage }: PaginationItemType) => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['suppliers', page, rowsPerPage], 
    queryFn: () => getSuppliers({ page, rowsPerPage }),
    initialData: {
      suppliers: [],
      page: 1,
      count: 0,
    },
  });

  return {
    suppliers: data?.results || [],
    page: data?.page || 1,
    count: data?.count || 0,
    error,
    isLoading,
  };
}

const usePostSuppliers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSuppliers,
    onSuccess: () => {
      // queryClient.invalidateQueries(['suppliers']);
      queryClient.invalidateQueries({
        queryKey: ['suppliers']
      });
    },
    onError: (error) => {
      console.error('Error creating supplier:', error);
    },
  });
};

const useDeleteSuppliers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSuppliers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['suppliers']
      });
    },
    onError: (error) => {
      console.error('Error creating supplier:', error);
    },
  });
};

export { useGetAllSuppliers, useGetSuppliers, usePostSuppliers, useDeleteSuppliers }