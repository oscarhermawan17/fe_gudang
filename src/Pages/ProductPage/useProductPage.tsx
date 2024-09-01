import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
  const response = await fetch('http://localhost:3007/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useProductPage = () => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['products'], 
    queryFn: fetchProducts,
    initialData: [],
  })

  return { products: data, error, isLoading }
}

export { useProductPage }

