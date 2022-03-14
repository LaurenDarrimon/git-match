import React from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import logo from "../assets/images/git-match-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
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
