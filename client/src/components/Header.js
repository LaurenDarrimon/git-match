import React from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import logo from "../assets/images/git-match-logo.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="dark text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <img src={logo} alt="GitMatch logo" />
          </Link>
          <p className="m-0">Developer Community & Collaboration Hub</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn btn-lg m-2 gradient" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg m-2 gradient" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg m-2 gradient" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
