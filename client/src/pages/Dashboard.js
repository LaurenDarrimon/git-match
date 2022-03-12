import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import API from '../utils/fetch'
import ProjectList from '../components/ProjectList';
import { resultKeyNameFromField } from '@apollo/client/utilities';

const Dashboard = () => {
  // const [toggle, setToggle] = useState({
  //     state: 'user'   
  // });

  // const [addProject, { error, data }] = useMutation(ADD_PROJECT);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [repoLink, setRepoLink] = useState("");

  useEffect(() => {
    API.fetchStarred(Auth.getProfile().data.githubUser)
      .then(async (response) => {
        const data = await response;
        // console.log(data[0].name);
        // project name
        if (data && data[0].name) {
          setProjectName(data[0].name);
        }
        // project description
        if (data && data[0].description) {
          setProjectDescription(data[0].description);
        }
        // repo link
        if (data && data[0].repo_link) {
          setRepoLink(data[0].repo_link);
        }
      });
  }, []);

  // function loadProjects() {
  //     API.fetchStarred(Auth.getProfile().data.githubUser)
  //       .then(response => response.json())
  //       .then( data => document.body.append());
  // }
  // console.log(loadProjects());


  // const CreateProject = projectArray.map((project,index) => {
  //     const { data } = addProject({
  //         variables: {
  //             ...projectArray[index]
  //         }
  //     })
  // })

  return (
    <div>
      <h5>{Auth.getProfile().data.githubUser} Dashboard</h5>
      <h4>Users Matches</h4>
      {/* <h1>{projectName}</h1>
      <h2>{projectDescription}</h2>
      <h2>{repoLink}</h2> */}
    </div>

  )
};
export default Dashboard;
