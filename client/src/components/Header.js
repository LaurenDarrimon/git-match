import React from "react";
import { Link } from "react-router-dom";
import { QUERY_USERS } from '../utils/queries';
import { useQuery, useMutation } from "@apollo/client";
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
  // const userData = useQuery(QUERY_USERS);
  // console.log(userData);
  // console.log('random user');
  // console.log(userData.data.users[0].githubUser);
  // const randIndex = Math.floor(Math.random() * userData.data.users.length)
  // const randUser = userData.data.users[randIndex].githubUser;
  // .users[Math.floor(Math.random()*userData.data.users.length)].githubUser

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
                
                
                {/* {userData.data ?
                  <Link to={`/profiles/${userData.data.users[randUser].githubUser}`}><button className="btn btn-lg m-2 gradient">
                    Start Matching
                  </button></Link> : <></>
                } */}
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
