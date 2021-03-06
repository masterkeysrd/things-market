export interface IProduct {
  id?: string;
  name?: string;
  type?: string;
  price?: number;
  description?: string;
  attributes?: IProductAttribute[];
}

export interface IProductAttribute {
  name?: string;
  value?: string;
}
