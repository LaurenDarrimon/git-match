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
  mutation signup($githubUser: String!, $email: String!, $password: String!) {
    signup(githubUser: $githubUser, email: $email, password: $password) {
      token
      user {
        _id
        githubUser
        name
        email
        password
        avatar
        bio
        location
        blog
        member_since
        projects {
          name
          description
          repo_link
        }
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($githubUser: String!, $name: String!, $description: String, $repo_link: String) {
    addProject(githubUser: $githubUser, name: $name, description: $description, repo_link: $repo_link){
      _id
      githubUser
      name
      description
      repo_link
    }
  }
`
