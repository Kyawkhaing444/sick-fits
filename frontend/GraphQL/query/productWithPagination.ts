import { gql } from 'graphql-tag';

export const ProductsWithPaginationQuery = gql`
  query ALL_Product_Query($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
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
