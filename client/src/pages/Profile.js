import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Match from "../components/Match";
import Project from "../components/Project";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import nextButton from "../assets/images/next.png";
import matchButton from "../assets/images/match-double.png";

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

  //if the user is logged in and the person logged in is on thier own profile, set logged in
  let loggedIn = false;
  if (Auth.loggedIn() && Auth.getProfile().data.githubUser === githubUser) {
    loggedIn = true;
  }

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
        <div className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          <h2>
            Viewing {githubUser ? `${user.githubUser}'s` : "your"} profile.
          </h2>
        </div>

        <div className="col-md-5">
          <img src={user.avatar} alt="user avatar from github" />
        </div>

        <div className="col-md-5">
          <div>
            <h4> user name {user.name}</h4>
            <p>email: {user.email}</p>
            <p>bio: {user.bio}</p>
            <p>location: {user.location}</p>
          </div>
        </div>

        <div>
          <img src={nextButton} alt="next button"/>
          <img src={matchButton} alt="match button" />
        </div>

        <div
          id="portfolio-list-section"
          className="row d-flex justify-content-around"
        >
          <h3> {user.githubUser}'s Starred Repos</h3>
          {user.projects.map((project) => (
            <Project
              key={project.name}
              name={project.name}
              description={project.description}
              repo_link={project.repo_link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
