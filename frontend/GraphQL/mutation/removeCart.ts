import { gql } from 'graphql-tag';

export const REMOVE_CART_MUTATION = gql`
  mutation RemoveCart($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;
