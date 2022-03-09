import axios from 'axios';

const API = {
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
    fetchPinned: (user) => {
        axios.get(``)
    },
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