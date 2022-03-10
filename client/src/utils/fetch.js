import { shouldCanonizeResults } from '@apollo/client/cache/inmemory/helpers';
import axios from 'axios';

const API = {
    //fetch the users info from GitHUb API
    fetchUser: (user) => {
        axios.get(`https://api.github.com/users/${user}`)
            .then((res) => {
                //Populate the database
                return {
                    name: res.name,
                    avatar: res.avatar_url,
                    blog: res.blog,
                    location: res.location,
                    member_since: res.created_at,
                    bio: res.bio
                }
                   

                
            })
    },
    //fetch a user starred repos from GitHUb API
    fetchStarred: (user) => {
        axios.get(`https://api.github.com/users/${user}/starred`)
        .then((res) => {
            const projects = res.data.results;
            const results = projects.map((project) => {
                return {
                    name: project.name,
                    description: project.description,
                    repo_link: project.html_url
                    
                }
            })
            return results;
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
} ;
//Fetch 
export default API;