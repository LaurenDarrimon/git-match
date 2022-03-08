const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Project {
    _id: ID
    name: String
    deployed_Link: String
    languages: [String]
}
type User {
    _id: ID
    githubUser: String
    name: String
    avatar: String
    blog: String
    location: String
    member_since: String
    bio: String
    swipeRight: String
    mutuals: String
    projects: String
}

type Query {
    projects: [Project]
    user(userId: ID!): User
    me: User
    languages: [Language]
}

type Mutation {
    login
    signup
    addUser
    addProject
    addMatch
}

`