export interface IProduct {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  attributes?: IProductAttribute[];
}

export interface IProductAttribute {
  name?: string;
  value?: string;
}
