import { gql } from 'graphql-tag';

export const ADD_TO_CART_MUTATION = gql`
  mutation Add_To_Cart($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;
