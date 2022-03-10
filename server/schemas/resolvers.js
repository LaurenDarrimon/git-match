const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('projects');
      },
      user: async (parent, { githubUser }) => {
        return User.findOne({ githubUser }).populate('projects');
      },
      projects: async (parent, { githubUser }) => {
        const params = githubUser ? { githubUser } : {};
        return Project.find(params);
      },
      project: async (parent, { projectId }) => {
        return Project.findOne({ _id: projectId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('projects');
        }
        throw new AuthenticationError('You need to be logged in!');
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
        const match = await Matchup.create(githubUser);
        return match;
      },      
    }
}

module.exports = resolvers;