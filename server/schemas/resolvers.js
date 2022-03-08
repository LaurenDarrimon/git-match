const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { id }) => {
        return User.findOne({ where: { id } }); 
      },
      project: async (parent, { id }) => {
        return Project.findOne({ where: { id }});
      },
    },
    Mutation: {
    }
}