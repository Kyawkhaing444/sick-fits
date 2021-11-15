import { gql } from 'graphql-tag';

export const CurrentUser = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
      }
    }
  }
`;
