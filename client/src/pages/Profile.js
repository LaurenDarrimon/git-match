import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Match from '../components/Match';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import ProjectList from '../components/ProjectList';


import Auth from '../utils/auth';

const Profile = () => {
  const { githubUser: userParam } = useParams();

  const { loading, data } = useQuery(
    userParam ? QUERY_SINGLE_USER : QUERY_ME, 
    {
      variables: { githubUser: userParam },
    }
  );

  const user = data?.me || data?.githubUser || {};
  
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
    return <Navigate to="/me" />;
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

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        {user.avatar}
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.githubUser}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
        <h3> Matches will go here. </h3>
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
              <h3> Something else can go here</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;