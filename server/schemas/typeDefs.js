const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    githubUser: String!
    password: String!
    name: String!
    avatar: String!
    blog: String!
    location: String!
    member_since: String!
    bio: String!
  }

  type Projects {
    _id: ID!
    name: String!
    repo_link: String!
    languages: [LanguageSchema!]! 
    deployed_Link: String!
  }

  type LanguageSchema {
    language: String!
    count: Number!
  }

  #queries
  type Query {
    user(userID: ID!): User
    languages: [Language]
    projects: [Projects]
  }
    
  #mutations 
  type Mutation {
    login
    signu
    addUser
    addProject
    addMatch
  }
`;

module.export = typeDefs;