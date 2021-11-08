import { gql } from 'graphql-tag';

export const AllProductQuery = gql`
  query ALL_Product_Query {
    allProducts {
      id
      name
      description
      price
      status
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
