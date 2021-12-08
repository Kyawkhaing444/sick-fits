import { gql } from 'graphql-tag';

export const ORDER_QUERY = gql`
  query getOrder($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      total
      charge
      user {
        id
      }
      items {
        id
        name
        description
        photo {
          image {
            publicUrlTransformed
          }
        }
        price
        quantity
      }
    }
  }
`;
