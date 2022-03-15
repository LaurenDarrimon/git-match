import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Match from './pages/Match'
import Project from './components/Project';
import Profile from './pages/Profile';
import CreateProject from './pages/CreateProject';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';

import './index.css';

import "./assets/fonts/LEMONMILK-Regular.woff2";
import "./assets/fonts/LEMONMILK-Regular.woff";
import "./assets/fonts/LEMONMILK-Medium.woff2";
import "./assets/fonts/LEMONMILK-Medium.woff";



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: (e) => { console.log(e) }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/profiles/:githubUser"
                element={<Profile />}
              />
              <Route
                path="/profiles/"
                element={<Profile />}
              />
              <Route
                path="/me"
                element={<Dashboard />}
              />
              <Route
                path="/matches/:githubUser"
                element={<Match />}
              />

              {/*
              <Route 
                path="/profiles/:username" 
                element={<Profile />}
              />
              <Route 
                path="/projects/:projectId" 
                element={<Project />}
              />
               <Route 
                path="/projects/create" 
                element={<CreateProject />}
              />
              <Route 
                path="*" 
                element={<NotFound />}
              /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;