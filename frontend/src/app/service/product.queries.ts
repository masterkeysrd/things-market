import { gql } from 'apollo-angular';

export const GET_PRODUCT = gql`
  query GetProductById($id: String!) {
    product(id: $id) {
      id
      name
      type
      price
      description
      attributes {
        name
        value
      }
    }
  }
`;

export const GET_PRODUCTS_LIST = gql`
query GetProductsList($page: Int, $pageSize: Int, $searchText: String) {
  products(page: $page, pageSize: $pageSize, searchText: $searchText) {
    page
    pages
    total
    hasPrev
    hasNext
    objects {
      id
      name
      type
      price
      description
    }
  }
}
`;


export const CREATE_PRODUCT = gql`
  mutation createProductMutation($name: String!, $type: String!, $description: String!, $price: Float!, $attributes: [AttributeInput]) {
    createProduct(input: {
        name: $name
        type: $type
        price: $price
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
  mutation updateProductMutation($id: String!, $name: String!, $type: String!, $price: Float!, $description: String!, $attributes: [AttributeInput]) {
    updateProduct(input: {
        id: $id
        name: $name
        type: $type
        price: $price
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
