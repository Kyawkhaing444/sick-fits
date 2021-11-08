import { gql } from 'graphql-tag';

export const createProductMutation = gql`
  mutation Create_Product_Mutation($name: String!, $description: String!, $price: Int!, $image: Upload) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
    }
  }
`;
