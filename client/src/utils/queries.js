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
      projects {
          name
          description
          repo_link
          languages {
            language
            count
          }
        }
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
      projects {
          name
          description
          repo_link
          languages {
            language
            count
          }
        }
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
      email
      projects {
          name
          description
          repo_link
          languages {
            language
            count
          }
        }
    }
  }
`;

export const QUERY_USER_PROJECTS = gql`
  query userProjects($githubUser: String!) {
    projects(githubUser: $githubUser){
      name
      description
      repo_link
      deployed_link
      languages {
            language
            count
          }
    }
  }
`;

export const QUERY_ONE_PROJECT = gql`
  query userProjects($projectId: ID!) {
    project(projectId: $projectId){
      name
      description
      repo_link
      deployed_link
      languages {
            language
            count
          }
    }
  }
`;

export const QUERY_ALL_PROJECTS = gql`
  query allProjects {
    projects {
      name
      description
      repo_link
      deployed_link
      languages {
            language
            count
          }
    }
  }  
`;
