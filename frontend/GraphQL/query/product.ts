import { gql } from 'graphql-tag';

export const ProductQuery = gql`
  query ProductQuery($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
