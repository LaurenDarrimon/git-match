import { React, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import Project from "../components/Project";

import { QUERY_SINGLE_USER, QUERY_ME, QUERY_USERS } from "../utils/queries";

import { ADD_SWIPE, ADD_MATCH } from "../utils/mutations";

import Auth from "../utils/auth";
import nextButton from "../assets/images/next.png";
import matchButton from "../assets/images/match-double.png";
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { githubUser } = useParams();

  const { loading, data } = useQuery(
    githubUser ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { githubUser: githubUser },
    }
  );

  const userData = useQuery(QUERY_USERS);

  const [addSwipe, swipeData] = useMutation(ADD_SWIPE);
  //look for swipeData.error and swipeData.data

  const [addMatch, matchData] = useMutation(ADD_MATCH);
  //look for matchData.error and matchData.data

  const [show, setShow] = useState(false);
  const [haveNotSwiped, setHaveNotSwiped] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSwiper = () => setHaveNotSwiped(true);
  const user = data?.me || data?.user || {};
  console.log("user", data);
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
  let nextUser;

  if (userData.data) {
    
    console.log(userData.data.users)
    
    const allUserData = [];

    for (let i = 0; i < userData.data.users.length; i++) {
      if (userData.data.users[i].githubUser !== Auth.getProfile().data.githubUser) {
        allUserData.push(userData.data.users[i]);
      }
    }
    console.log('allUserData');
    console.log(allUserData);

    nextUser = allUserData[Math.floor(Math.random() * allUserData.length)];

    console.log("index:" + Math.floor(Math.random() * allUserData.length))
    console.log("nextUser");
    console.log(nextUser);
  }

  //EVENT handler for swipe button
  const handleSwipe = async (event) => {
    console.log("someone swiped!");
    console.log(event);
    console.log(event.target.dataset.user2);

    const githubUser1 = Auth.getProfile().data.githubUser;
    const githubUser2 = event.target.dataset.user2;

    console.log("githubUser2");
    console.log(githubUser2);

    console.log("githubUser1");
    console.log(githubUser1);

    try {
      //add swipe
      const newSwipeData = await addSwipe({
        variables: { githubUser: githubUser1, githubUser2: githubUser2 },
      });

      console.log("newswipedata");
      console.log(newSwipeData);

      // //check user2  the profile we are viewing
      console.log("user 2 data");
      console.log(data);
      console.log(data.user.swipeRight);

      const profileSwipeRight = data.user.swipeRight;

      const uniqueSwipe = [...new Set(profileSwipeRight)];
      console.log(uniqueSwipe);

      for (let i = 0; i < uniqueSwipe.length; i++) {
        console.log(uniqueSwipe[i].githubUser2);
        if (uniqueSwipe[i].githubUser2 === githubUser1) {
          console.log("both users have matched!!");
          addToMatches(githubUser1, githubUser2);
          setIsOpen(true);
          setShow(true);
          setHaveNotSwiped(false)
        } else {
          // window.location.assign(`/profiles/${nextUser.githubUser}`)
          console.log("no match");
          setHaveNotSwiped(false)
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addToMatches = async (githubUser1, githubUser2) => {
    // //add matches
    const newMatchData1 = await addMatch({
      variables: { githubUser: githubUser1, githubUser2: githubUser2 },
    });
    console.log("newMatchData1");
    console.log(newMatchData1);

    const newMatchData2 = await addMatch({
      variables: { githubUser: githubUser2, githubUser2: githubUser1 },
    });

    console.log("newMatchData2");
    console.log(newMatchData2);
    //add matches
  };
  
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
            <p>bio: {user.bio}</p>
            <p>location: {user.location}</p>
          </div>
        </div>
        
        <div>
          <div>
            {nextUser ? 
              <Link to={`/profiles/${nextUser.githubUser}`}>
                {githubUser ? <img
                  src={nextButton}
                  alt="next button"
                  data-user2={user.githubUser}
                  onClick={handleSwiper}
                /> : 
                <button className="btn btn-lg m-2 gradient">
                Start Matching!
              </button>
              }
                
              </Link> :
              <h4> Unfortunately, You are the only user on this app</h4>
            }

          </div>
          {githubUser && haveNotSwiped ?
            <div onClick={handleSwipe}>
              <img
                src={matchButton}
                alt="match button"
                data-user2={user.githubUser}
                style={{ cursor: 'pointer' }}
              />
            </div>
            : <div></div>}
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

      <div>
        <Modal show={show} onHide={handleClose} className="modal-card">
          <Modal.Header closeButton>
            <Modal.Title>You've GITMATCHED!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Start collaborating!</Modal.Body>
          <Modal.Footer>
          {nextUser && (
            <Button variant="secondary" 
            href={`/profiles/${nextUser.githubUser}`}
            onClick={handleClose} 
            className="gradient"
            >
            Next
          </Button>
            )}
            <Button variant="secondary" onClick={handleClose} className="gradient">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
};

export default Profile;
