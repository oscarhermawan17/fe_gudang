import { useQuery } from '@tanstack/react-query'

import { getAllPaymentTypeSuppliers } from '@/utils/api/paymentTypeSupplier'

const usePaymentTypeSuppliers = () => {
  const { data, error, isLoading } = useQuery({ 
    queryKey: ['allPaymentTypeSuppliers'], 
    queryFn: getAllPaymentTypeSuppliers,
    initialData: [],
  })

  return { paymentTypeSuppliers: data, error, isLoading }
}

export { usePaymentTypeSuppliers }