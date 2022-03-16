import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

import Auth from "../utils/auth";
import logo from "../assets/images/git-match-nav.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="dark text-light mb-4 py-3 align-center">
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Link className="text-light" to="/">
              <img src={logo} alt="GitMatch logo" style={{ width: "300px" }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="me-auto">
            <div className="col">
              <p className="m-0">Developer Community & Collaboration Hub</p>
            </div>
          </Nav>

          <Nav>
             {Auth.loggedIn() ? (
              <>
                  <Nav>
                    <span>Hey there, {Auth.getProfile().data.githubUser}!</span>                    
                  </Nav>
                  <Nav>
                    <button className="btn btn-lg m-2 gradient" onClick={logout}>
                      Logout
                    </button>                    
                  </Nav>
                  <Nav>
                    <Link to="/profiles"><button className="btn btn-lg m-2 gradient">
                      My Profile
                    </button></Link>                    
                  </Nav>                 
                  <Nav>
                    <Link to="/"><button className="btn btn-lg m-2 gradient">
                      Home
                    </button></Link>                       
                  </Nav>
              </>
            ) : (
              <></>
            )}           
          </Nav>
        </Container>

      </Navbar>
     
    </header>

  );
};

export default Header;
