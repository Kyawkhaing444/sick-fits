import { gql } from 'graphql-tag';

export const CurrentUser = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          quantity
          product {
            id
            name
            description
            price
            status
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;
