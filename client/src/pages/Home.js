import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import Dashboard from './Dashboard'
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import Nav from '../components/Nav';
// import Login from './pages/Login';

import '../index.css';

const Home = () => {

  let loggedIn = localStorage.getItem('id_token');

  return (
    //if logged in display dashboard, otherwise display home
    <main>

      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px solid #1a1a1a' }}
        >
        </div>
        <div className="col-12 col-md-8 mb-3">

          {loggedIn ? (
            <div>
              <Nav />
              <Dashboard />
            </div>
          ) : (
            <div>
              <>
                <Link className="btn btn-lg m-2 gradient" to="/login">
                  Login
                </Link>
                <Link className="btn btn-lg m-2 gradient" to="/signup">
                  Signup
                </Link>
              </>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;