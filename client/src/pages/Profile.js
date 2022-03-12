import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Match from '../components/Match';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import ProjectList from '../components/ProjectList';


import Auth from '../utils/auth';

const Profile = () => {
  const { githubUser } = useParams();

  const { loading, data } = useQuery(
    githubUser? QUERY_SINGLE_USER : QUERY_ME, 
    {
      variables: { githubUser: githubUser},
    }
  );
  console.log(data)
  const user = data?.me || data?.user || {};
  
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data._id === githubUser) {
  //   return <Navigate to="/me" />;
  // }

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


  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {githubUser ?  `${user.githubUser}'s` : 'your'} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
        <ul>
          <h4>{user.name}</h4> 
          <h3>{user.email}</h3>
          <h4>{user.bio}</h4>
          <h4>{user.location}</h4>      
          <h4>{user.avatar}</h4>    
        </ul>

        </div>
      </div>
    </div>
  );
};

export default Profile;