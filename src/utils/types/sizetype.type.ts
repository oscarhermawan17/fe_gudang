export type SizeVariantType = {
  size_type: string;
  size_variant_id: number;
  size_variant_name: string;
}

export type SizeTypeType = {
  size_type_id: string;
  size_variants: SizeVariantType[]
}