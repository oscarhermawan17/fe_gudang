export type CreatingSupplierType = {
  name: string;
  address: string;
  contact: string;
  email: string;
  city: string;
  zipcode: string;
  phone: string;
  pkp: string;
  npwp: string;
  payment_type_suppliers: Array<{
    payment_type_supplier_name: string
  }>
}
export type SupplierType = CreatingSupplierType & {
  supplier_id: string;
}