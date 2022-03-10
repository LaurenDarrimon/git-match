import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      githubUser
      name
      avatar
      blog
      location
      bio
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      githubUser
      name
      avatar
      blog
      location
      bio
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($githubUser: String!) {
    user(githubUser: $githubUser) {
      _id
      githubUser
      name
      avatar
      blog
      location
      bio
    }
  }
`;

export const QUERY_USER_PROJECTS = gql`
  query userProjects($githubUser: String!) {
    project
  }
`;
