import { gql } from 'graphql-tag';

export const CHECK_OUT_MUTATION = gql`
  mutation checkOut($token: String!) {
    checkOut(token: $token) {
      id
      total
      charge
      items {
        id
        name
      }
    }
  }
`;
