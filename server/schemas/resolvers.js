const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");
const fetch = require("node-fetch");

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
      const arr = [];
      const langArr = [];
      const repoArr = [];
      await fetch(`https://api.github.com/users/${githubUser}`)
        .then((response) => response.json())
        .then((data) => {
          results = {
            name: data.name,
            avatar: data.avatar_url,
            blog: data.blog,
            location: data.location,
            member_since: data.created_at,
            bio: data.bio,
          };

        return fetch(`https://api.github.com/users/${githubUser}/starred`); 
        })
      // close  
        .then((response) => response.json())
        .then((data) => {
          for (var i = 0; i < data.length; i++) {
            //for each project, make call for languages on that project

            repoArr.push(data[i].name);
            const projectInfo = {
              name: data[i].name,
              description: data[i].description,
              repo_link: data[i].html_url,
            }
            arr.push(projectInfo);
                           
          }
        });

        for(let i = 0; i < repoArr.length; i++){
          fetch(
            `https://api.github.com/repos/${githubUser}/${repoArr[i]}/languages`
          )
            .then((response) => response.json())
            .then((langData) => {
              // console.log('langData:');
              // console.log(langData instanceof Object);
              for (lang in langData) {
                // console.log("we're in the lang loop");
                language = {
                  language: lang,
                  count: langData[lang],
                };
                langArr.push(language);
              };

              for (let i = 0; i < arr.length ; i++) {
                arr[i].languages = langArr[i];
              }
              console.log('arr');
              console.log(arr)
              // console.log(langArr);

  
              results.projects = arr;
              console.log("______results________")
              console.log(results);
            })    
        }

        console.log('arr array:', arr);


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
