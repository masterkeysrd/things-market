export interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  attributes: ProductAttribute[];
}

export interface ProductAttribute {
  name: string;
  value: string;
}
