import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/utils/api/product'

const useGetProducts = ({ page, rowsPerPage }) => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['products', page, rowsPerPage], 
    queryFn: () => getProducts({ page, rowsPerPage }),
    initialData: {
      products: [],
      page: 1,
      count: 0,
    },
  });

  return {
    products: data?.results || [],
    page: data?.page || 1,
    count: data?.count || 0,
    error,
    isLoading,
  };
}


export { useGetProducts }