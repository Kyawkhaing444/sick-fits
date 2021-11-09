import { gql } from 'graphql-tag';

export const deleteProductMutation = gql`
  mutation Delete_Product_Mutation($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;
