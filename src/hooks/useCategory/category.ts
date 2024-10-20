import { useQuery } from '@tanstack/react-query'

import { getAllCategories } from '@/utils/api/category'

const useGetAllCategory = () => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['allCategories'], 
    queryFn: getAllCategories,
    initialData: [],
  })

  return { categories: data, error, isLoading }
}

export { useGetAllCategory }