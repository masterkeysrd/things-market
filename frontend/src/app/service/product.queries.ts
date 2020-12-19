import { gql } from 'apollo-angular';

export const GET_PRODUCTS_LIST = gql`
  query GetProductsList {
    products {
      id
      name
      type
      description
    }
  }
`
