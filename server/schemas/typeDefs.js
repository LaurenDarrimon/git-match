const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    githubUser: String!
    password: String
    name: String
    avatar: String
    blog: String
    location: String
    member_since: String
    bio: String
  }

  type Project {
    _id: ID
    name: String!
    repo_link: String
    languages: String 
    deployed_Link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(githubUser: String!): User
    projects(githubUser: String!): [Project]
    project(projectID: ID!): Project
    me: User
  }
    
  type Mutation {
    login(githubUser: String!, password: String!): Auth
    signup(githubUser: String!, password: String!): Auth
    addProject(projectID: ID!): Project
    addMatch(githubUser: String!): Auth
  }
`;

module.exports = typeDefs;