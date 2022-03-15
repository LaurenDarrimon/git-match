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

const Match = () => {
    //const [profileState, setProfileState] = useState({ githubUser2: '' });
    //   const [isOpen, setIsOpen] = useState(false);
    const { githubUser } = useParams();

    const { loading, data } = useQuery(
        githubUser ? QUERY_SINGLE_USER : QUERY_ME,
        {
            variables: { githubUser: githubUser },
        }
    );

    const userData = useQuery(QUERY_USERS);
    // const allUserData = UserData.data.users.filter(user => user.githubUser !== Auth.getProfile.data.githubUser);




    const [show, setShow] = useState(false);

    //console.log(data);
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
        //const allUserData = UserData.data.users.filter(user => user.githubUser !== Auth.getProfile.data.githubUser);\
        console.log(userData.data.users)
        // const allUserData = userData.data.users.filter(user => user.githubUser !== Auth.getProfile.data.githubUser);
        const allUserData = [];

        for (let i = 0; i < userData.data.users.length; i++) {
            if (userData.data.users[i].githubUser !== Auth.getProfile().data.githubUser) {
                allUserData.push(userData.data.users[i]);
            }
        }
        console.log('allUserData');
        console.log(allUserData);




        nextUser =
            allUserData[Math.floor(Math.random() * allUserData.length)];

        console.log("index:" + Math.floor(Math.random() * allUserData.length))
        console.log("nextUser");
        console.log(nextUser);
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
                        <p>contact email: {user.email}</p>
                        <p>bio: {user.bio}</p>
                        <p>location: {user.location}</p>
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

export default Match;
