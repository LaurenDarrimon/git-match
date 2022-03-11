import { shouldCanonizeResults } from '@apollo/client/cache/inmemory/helpers';
import axios from 'axios';


const API = {
  //fetch the users info from GitHUb API
  fetchUser: function (user) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.github.com/users/${user}`)
        .then((res) => {
          //Populate the database
          // console.log('res', res);
          const user = res.data;
          // console.log('user',user);
          const results = {
            name: user.name,
            avatar: user.avatar_url,
            blog: user.blog,
            location: user.location,
            member_since: user.created_at,
            bio: user.bio
          };
          resolve(results);


        }).catch((err) => reject(err));
    });
  },
  //fetch a user starred repos from GitHUb API
  fetchStarred: (user) => {
    return new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${user}/starred`)
      .then((res) => {
        // console.log(res)
        const projects = res.data;
        // console.log('projects', projects);
        const results = projects?.map((project) => {
           return {
            name: project.name,
            description: project.description,
            repo_link: project.html_url
          }
        });
        // console.log(results);
        resolve(results)
      }).catch((err) => reject(err));
    })
  },
  

  //fetch a repo's programming languagesfrom GitHUb API
  fetchLanguage: (user, repo) => {
    axios.get(`https://api.github.com/repos/${user}/${repo}/languages`)
      .then((res) => {
        return res;
        // for (const key in res) {
        //     let language = Object.keys(res);
        //     let count = res[key],
        // }
      })
  }
};
//Fetch 
export default API;