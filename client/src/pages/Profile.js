import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useState, useMutation} from "@apollo/client";

import Match from "../components/Match";
import Project from "../components/Project";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import { ADD_SWIPE, ADD_MATCH } from "../utils/mutations";

import Auth from "../utils/auth";
import nextButton from "../assets/images/next.png";
import matchButton from "../assets/images/match-double.png";

const Profile = () => {
  //const [profileState, setProfileState] = useState({ githubUser2: '' });

  const { githubUser } = useParams();

  const { loading, data } = useQuery(
    githubUser ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { githubUser: githubUser },
    }
  );

  const [addSwipe, swipeData ] = useMutation(ADD_SWIPE);
    //look for swipeData.error and swipeData.data

  const [addMatch,  matchData ] = useMutation(ADD_MATCH);
  //look for matchData.error and matchData.data


  //console.log(data);
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

  //EVENT handler for next button 
  const handleNext = async (event) => {
    // console.log("next button!");
    // console.log(event);

  }

  //EVENT handler for swipe button 
  const handleSwipe = async (event) => {
    console.log("someone swiped!");
    console.log(event);
    console.log(event.target.dataset.user2);


    const githubUser1 = Auth.getProfile().data.githubUser
    const githubUser2 = event.target.dataset.user2; 

    console.log("githubUser2")
    console.log(githubUser2)

    console.log("githubUser1")
    console.log(githubUser1)

    try {

      //add swipe
      const newSwipeData = await addSwipe({
        variables: { githubUser: githubUser1, githubUser2: githubUser2 },
      });

      console.log("newswipedata")
      console.log(newSwipeData)

      // //check user2 
      // const { data } = await addMatch({
      //   variables: { ... },
      // });

      // //add matches 
      // const { data } = await addMatch({
      //   variables: { ... },
      // });
      

      //Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }



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
            <h4>{user.name}</h4>
            <p>email: {user.email}</p>
            <p>bio: {user.bio}</p>
            <p>location: {user.location}</p>
          </div>
        </div>

        <div>
          <div onClick={handleNext}>
            <img src={nextButton} alt="next button" data-user2={user.githubUser}/>
          </div>
          <div onClick={handleSwipe}>
            <img src={matchButton} alt="match button" data-user2={user.githubUser}/>
          </div>
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
