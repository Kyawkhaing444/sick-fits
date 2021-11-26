import { gql } from 'graphql-tag';

export const createUserMutation = gql`
  mutation Create_User_Mutation($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;
