const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    githubUser: String
    password: String
    email: String
    name: String
    avatar: String
    blog: String
    location: String
    member_since: String
    bio: String
    projects: [Project]
    swipeRight: [SwipeRight]
    match: [Match]
  }

  type SwipeRight {
    githubUser: String
  }

  type Match {
    githubUser: String
  }

  type Project {
    name: String
    repo_link: String
    description: String
    languages: [Language]
  }

  type Language {
    language: String
    count: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(githubUser: String!): User
    allProjects: Project
    projects(githubUser: String): [Project]
    project(projectId: ID!): Project
    me: User
  }
    
  type Mutation {
    login(githubUser: String!, password: String!): Auth
    signup(githubUser: String!, email: String!, password: String!): Auth
    addProject(name: String!, githubUser: String!): Project
    addMatch(githubUser1: String!, githubUser2: String!): User
    addSwipe(githubUser1: String!, githubUser2: String!): User

    removeUser(githubUser: ID!): User
  }
`;

module.exports = typeDefs;