const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");
const axios = require("axios");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { githubUser }) => {
      return User.findOne({ githubUser });
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
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    login: async (parent, { githubUser, password }) => {
      const user = await User.findOne({ githubUser });

      if (!user) {
        throw new AuthenticationError("No user found with this github account");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    signup: async (parent, { githubUser, email, password }) => {
      // open
      let results = {};
      const projectArr = [];

      //-------------API call for USER----------------------------------
      const apiUser = async () => {
        try {
          const userResponse = await axios.get(
            `https://api.github.com/users/${githubUser}`
          );

          console.log("______________userResponse_________");
          console.log(userResponse);

          const results = {
            name: userResponse.data.name,
            avatar: userResponse.data.avatar_url,
            blog: userResponse.data.blog,
            location: userResponse.data.location,
            member_since: userResponse.data.created_at,
            bio: userResponse.data.bio,
          };

          console.log("______________results_________");
          console.log(results);
        } catch (err) {
          // Handle Error Here
          console.error(err);
          console.error("Error in the user call");
        }
      };

      //-------------API call for PROJECTS----------------------------------
      const apiProjects = async () => {
        try {
          const projectResponse = await axios.get(
            `https://api.github.com/users/${githubUser}/starred`
          );

          const projectData = projectResponse.data;

          for (var i = 0; i < projectData.length; i++) {
            //for each project, make call for languages on that project

            let repoName = projectData[i].name;

            console.log(repoName);

            const singleProjectInfo = {
              name: projectData[i].name,
              description: projectData[i].description,
              repo_link: projectData[i].html_url,
            };

            projectArr.push(singleProjectInfo);

            //for each project, wait until we get the lang array
            const langArr = [];

            //-------------nested API call for LANGUAGES----------------------------------
            const langResponse = await axios.get(
              `https://api.github.com/repos/${githubUser}/${repoName}/languages`
            );

            const langData = langResponse.data;

            for (lang in langData) {
              const language = {
                language: lang,
                count: langData[lang],
              };
              langArr.push(language);
            }

            //set a key of languages with the array on each project
            singleProjectInfo.languages = langArr;
          }
        } catch (err) {
          console.error(err);
          console.error("Error in project call");
        }
      };

      //wait for the userdata
      await apiUser();

      //then, once we have the user data, get the project data
      await apiProjects();
      //within each project call, we will make a call for each language
      // await apiProjects();

      //add a key of projects to the results array, and fill it with the project array.
      results.projects = projectArr;

      const user = await User.create({
        githubUser,
        email,
        password,
        ...results,
      });
      const token = signToken(user);
      return { token, user };
    },

    // will add info later, not sure what we are doing with this yet
    //neme is repo name
    addProject: async (
      parent,
      { githubUser, name, description, repo_link }
    ) => {
      const project = await Project.create({
        githubUser,
        name,
        description,
        repo_link,
      });

      User.findOneAndUpdate(
        { githubUser: githubUser },
        { $addToSet: { projects: project._id } }
      );

      return project;
    },

    // might not be right, but to create a match, we want to add the target user id onto the
    // match array of the logged in user.
    addMatch: async (parent, { ObjectId }, context) => {
      const match = await User.updateOne(
        { githubUser: context.user.githubUser },
        { $push: { _id: ObjectId } }
      );
      // Matchup.create(githubUser);
      return match;
    },
    // remove user
    removeUser: async (parent, args) => {
      return User.findOneAndDelete(args.id);
    },
  },
};

module.exports = resolvers;
