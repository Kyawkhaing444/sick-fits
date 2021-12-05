import { gql } from 'graphql-tag';

export const SEARCH_QUERY = gql`
  query SearchItem($searchTerm: String!) {
    SearchTerms: allProducts(
      where: { OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }] }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
