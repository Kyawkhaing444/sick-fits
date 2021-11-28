import { gql } from 'graphql-tag';

export const PasswordResetUserMutation = gql`
  mutation PasswordResetUser($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, password: $password, token: $token) {
      __typename
      message
      code
    }
  }
`;
