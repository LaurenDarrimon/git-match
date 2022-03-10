import React from 'react';
import { useQuery } from '@apollo/client';

//import Dashboard from './pages/Dashboard'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import '../index.css';

const Home = () => {

    let loggedIn; 

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
          { loggedIn ? (
            <div> <h2>Dashboard goes here</h2> </div>
          ) : (
            <div> <h2>Login screen goes here</h2> </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;