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


export const CREATE_PRODUCT = gql`
  mutation createProductMutation($name: String!, $type: String!, $description: String!, , $attributes: [AttributeInput]) {
    createProduct(input: {
        name: $name
        type: $type
        description: $description
        attributes: $attributes
    })
    {
      ok
      product {
        id
        name

      }
    }
  }
`


export const UPDATE_PRODUCT = gql`
  mutation updateProductMutation($id: String!, $name: String!, $type: String!, $description: String!, $attributes: [AttributeInput]) {
    updateProduct(input: {
        id: $id
        name: $name
        type: $type
        description: $description
        attributes: $attributes
    })
    {
      ok
      product {
        id
        name

      }
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProductMutation($id: String!) {
    deleteProduct( id: $id) {
      ok
      product {
        id
        name

      }
    }
  }
`;
