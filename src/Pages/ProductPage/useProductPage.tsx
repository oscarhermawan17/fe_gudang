import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
  const response = await fetch(`${import.meta.env.VITE_BE_API_URL}/api/${import.meta.env.VITE_BE_API_VERSION}/products`);
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

