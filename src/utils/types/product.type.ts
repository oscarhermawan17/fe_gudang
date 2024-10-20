import type { CategoryType, SupplierType, SizeTypeType } from "../types";

export type CreatingProduct = {
  barcode: string;
  category: CategoryType;
  supplier: SupplierType;
  sizetype: SizeTypeType;
}
export type ProductType = CreatingProduct & {
  product_id: string;
}