import { gql } from 'graphql-tag';

export const ALL_ORDER_QUERY_MUTATION = gql`
  query {
    allOrders {
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
