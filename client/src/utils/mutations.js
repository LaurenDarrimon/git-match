import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($githubUser: String!, $password: String!) {
    login(githubUser: $githubUser, password: $password) {
      token
      user {
        _id
        githubUser
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($githubUser: String!, $email: String!, $password: String!) {
    signup(githubUser: $githubUser, email: $email, password: $password) {
      token
      user {
        _id
        githubUser
        email
      }
    }
  }
`;
