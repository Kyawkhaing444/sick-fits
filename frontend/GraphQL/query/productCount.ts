import { gql } from 'graphql-tag';

export const ProductCount = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;
