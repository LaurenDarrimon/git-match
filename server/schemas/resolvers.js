const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { id }) => {
        return User.findOne({ where: { id } }); 
      },
      projects: async (parent, { githubUser }) => {
        const params = githubUser ? { githubUser } : {};
        return Project.find(params);
      },
      project: async (parent, { projectID }) => {
        return Project.findOne({ _id: projectID });
      },
    },

    Mutation: {
      login: async (parent, { githubUser, password }) => {
        const user = await User.findOne({ githubUser });
  
        if (!user) {
          throw new AuthenticationError('No user found with this github account');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },

      signup: async (parent, { githubUser, password }) => {
        const user = await User.create({ githubUser, password });
        const token = signToken(user);
        return { token, user };
      },

      // will add info later, not sure what we are doing with this yet
      addProject: async (parent, { name }, context) => {
        if (context.user) {
          const project = await Project.create({
            name,
            repo_link: context.user.username,
          });
          return project;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      addMatch: async (parent, { githubUser }) => {
        const match = await Matchup.create(args);
        return match;
      },      
    }
}

module.exports = resolvers;