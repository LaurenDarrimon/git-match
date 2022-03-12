import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import API from "../utils/fetch";

const Dashboard = () => {
  // const [toggle, setToggle] = useState({
  //   state: "user",
  // });

  // const [addProject, { error, data }] = useMutation(ADD_PROJECT);

// let allProjects =[];

//   const projectFetcher = async () => {
//     return await API.fetchStarred(Auth.getProfile().data.githubUser);
//   };

//   const projectMaker = async () => {
//     const fetchedProjects = await projectFetcher();

//     console.log(fetchedProjects);

//     for (let i = 0; i < fetchedProjects.length; i++) {
//         console.log("____________this is what we are trying to push into array")
//         console.log( fetchedProjects[i]);
//         allProjects.push(fetchedProjects[i]);
//         console.log(allProjects);
//     }
//     console.log(  allProjects instanceof Array )
//     return allProjects;
// }

// allProjects = projectMaker()


const [projectName, setProjectName] = useState("");
const [projectDescription, setProjectDescription] = useState("");
const [repoLink, setRepoLink] = useState("");

useEffect(() => {
  API.fetchStarred(Auth.getProfile().data.githubUser)
    .then(async (response) => {
      const data = await response;
      console.log(data[0].name);
      // project name
      if(data && data[0].name){
        setProjectName(data[0].name);
      }
      // project description
      if(data && data[0].description){
        setProjectDescription(data[0].description);
      }
      // repo link
      if(data && data[0].repo_link){
        setRepoLink(data[0].repo_link);
      }
    });
}, []);

  return (
    <div>
      <h5>{Auth.getProfile().data.githubUser} Dashboard</h5>
      <h4>Projects/Users Matches</h4>
      <p>
            <h1>{projectName}</h1>
            <h2>{projectDescription}</h2>
            <h2>{repoLink}</h2>
      </p>
    </div>
  );
};

export default Dashboard;
