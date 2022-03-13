import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Match from "../components/Match";
import Project from "../components/Project";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { githubUser } = useParams();

  const { loading, data } = useQuery(
    githubUser ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { githubUser: githubUser },
    }
  );
  console.log(data);
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === githubUser) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.githubUser) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {githubUser ? `${user.githubUser}'s` : "your"} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <div>
          <h4> user name {user.name}</h4>
          <p>email: {user.email}</p>
          <p>bio: {user.bio}</p>
          <p>location: {user.location}</p>
          </div>

          <div
          id="portfolio-list-section"
          className="row d-flex justify-content-around"
        >
          {user.projects.map((project) => (
            <Project
              key={project.name}
              name={project.name}
              description={project.description}
              repo_link={project.repo_link}
            />
          ))}
        </div>

          <img src={user.avatar} alt="user avatar from github" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
