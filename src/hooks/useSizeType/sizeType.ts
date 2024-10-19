import { useQuery } from '@tanstack/react-query'

import { getAllSizeTypes } from '@/utils/api/sizeType'

const useSizeType = () => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['allSizeTypes'], 
    queryFn: getAllSizeTypes,
    initialData: [],
  })

  return { sizeTypes: data, error, isLoading }
}

export { useSizeType }