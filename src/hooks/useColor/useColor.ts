import { useQuery } from '@tanstack/react-query'

import { getAllColors } from '@/utils/api/color'

async function getAllColorsx() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = [
        { color_id: 1, name: 'Red' },
        { color_id: 2, name: 'Green' },
        { color_id: 3, name: 'Blue' },
      ];
      resolve(mockData);
    }, 100);
  });
}

const useGetAllColors = () => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['allColor'], 
    queryFn: getAllColorsx,
    initialData: [],
  })

  return { allColors: data, error, isLoading }
}

export { useGetAllColors }