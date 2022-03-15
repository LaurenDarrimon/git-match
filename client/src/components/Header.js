import React from "react";
import { Link } from "react-router-dom";
import { QUERY_USERS } from '../utils/queries';
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import logo from "../assets/images/git-match-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  // const userData = useQuery(QUERY_USERS);
  // console.log(userData);
  // console.log('random user');
  // console.log(userData.data.users[0].githubUser);
  // const randIndex = Math.floor(Math.random() * userData.data.users.length)
  // const randUser = userData.data.users[randIndex].githubUser;
  // .users[Math.floor(Math.random()*userData.data.users.length)].githubUser

  return (
    <header className="dark text-light mb-4 py-3 align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="col-md-3">
          <Link className="text-light" to="/">
            <img src={logo} alt="GitMatch logo" style={{ width: "300px" }} />
          </Link>
        </div>
        <div className="col-md-3">
          <p className="m-0">Developer Community & Collaboration Hub</p>
        </div>
        <div className="col-md-3">
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.githubUser}!</span>
              <button className="btn btn-lg m-2 gradient" onClick={logout}>
                Logout
              </button>
              <Link to="/profiles"><button className="btn btn-lg m-2 gradient">
                My Profile
              </button></Link>
              <Link to="/"><button className="btn btn-lg m-2 gradient">
                Home
              </button></Link>
              {/* {userData.data ?
                <Link to={`/profiles/${userData.data.users[randUser].githubUser}`}><button className="btn btn-lg m-2 gradient">
                  Start Matching
                </button></Link> : <></>
              } */}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
