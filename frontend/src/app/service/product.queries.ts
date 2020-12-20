import { gql } from 'apollo-angular';

export const GET_PRODUCT = gql`
query GetProductById($id: String!) {
  product(id: $id) {
    id
    name
    type
    description
    attributes {
      name
      value
    }
  }
}
`;

export const GET_PRODUCTS_LIST = gql`
  query GetProductsList {
    products {
      id
      name
      type
      description
    }
  }
`;
