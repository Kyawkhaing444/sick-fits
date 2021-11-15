import { gql } from 'graphql-tag';

export const SignOutUser = gql`
  mutation signOut {
    endSession
  }
`;
