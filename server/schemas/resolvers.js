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
      allProjects: async () => {
        return Project.find();
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
      addProject: async (parent, { name, githubUser }) => {
        const project = await Project.create({ name, githubUser });

        await User.findOneAndUpdate(
          { githubUser: githubUser },
          { $addToSet: { projects: project._id } }
        );

        return project;
      },

      // might not be right, but to create a match, we want to add the target user id onto the
      // match array of the logged in user.
      addMatch: async (parent, { ObjectId }, context) => {
        const match = await User.updateOne( 
          {githubUser: context.user.githubUser},
          { $push: { _id:  ObjectId }}
          )
        // Matchup.create(githubUser);
        return match;
      },      
    }
}

module.exports = resolvers;