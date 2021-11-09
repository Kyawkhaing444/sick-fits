import { gql } from 'graphql-tag';

export const updateProductMutation = gql`
  mutation Update_Product_Mutation($id: ID!, $name: String!, $description: String!, $price: Int!) {
    updateProduct(id: $id, data: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;
