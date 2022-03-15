import { gql } from "@apollo/client";

// export const REMOVE_DUPE = gql`
// mutation removeDupe($githubUser: String!) {

// }
// `

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
          languages {
            language
            count
          }
        }
      }
    }
  }
`;

export const ADD_SWIPE = gql`
  mutation addSwipe($githubUser: String!, $githubUser2: String!) {
    addSwipe(githubUser: $githubUser, githubUser2: $githubUser2) {
      githubUser
      swipeRight {
        githubUser2
      }
    }
  }
`;


export const ADD_MATCH = gql`
  mutation addMatch($githubUser: String!, $githubUser2: String!) {
    addMatch(githubUser: $githubUser, githubUser2: $githubUser2) {
      githubUser
      match {
        githubUser2
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $githubUser: String!
    $name: String!
    $description: String
    $repo_link: String
  ) {
    addProject(
      githubUser: $githubUser
      name: $name
      description: $description
      repo_link: $repo_link
    ) {
      _id
      githubUser
      name
      description
      repo_link
      languages {
        language
        count
      }
    }
  }
`;
