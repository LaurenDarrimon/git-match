import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import API from "../utils/fetch";

const Dashboard = () => {
  const [toggle, setToggle] = useState({
    state: "user",
  });

  const [addProject, { error, data }] = useMutation(ADD_PROJECT);

let allProjects =[];

  const projectFetcher = async () => {
    return await API.fetchStarred(Auth.getProfile().data.githubUser);
  };

  const projectMaker = async () => {
    const fetchedProjects = await projectFetcher();

    console.log(fetchedProjects);

    for (let i = 0; i < fetchedProjects.length; i++) {
        console.log("____________this is what we are trying to push into array")
        console.log( fetchedProjects[i]);
        allProjects.push(fetchedProjects[i]);
    }
    console.log(  allProjects instanceof Array )
    return allProjects;
}

allProjects = projectMaker()

  return (
    <div>
      <h5>{Auth.getProfile().data.githubUser} Dashboard</h5>
      <h4>Projects/Users Matches</h4>
      <p>
        {/* {allProjects.map((project) => (
          <h5>{project.name}</h5>
        ))} */}
      </p>
    </div>
  );
};

export default Dashboard;
