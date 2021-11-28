import { gql } from 'graphql-tag';

export const RequestResetUserMutation = gql`
  mutation RequestResetUser($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;
