// import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import { useQuery, useState, useMutation } from "@apollo/client";

import Auth from '../utils/auth';


const Dashboard = () => {
  const { githubUser } = useParams();

  const { loading, data } = useQuery(
    githubUser ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { githubUser: githubUser },
    }
  );
  const user = data?.me || data?.user || {};
    const matches = user.match;
    console.log(user)
    console.log(matches)

  return (
    <div>
      <h5>{Auth.getProfile().data.githubUser} Dashboard</h5>
      <h4>Users Matches</h4>
      <div>
        <ul>
          {matches.map((match) => (
            <li key={match.githubUser2}>
             {match.githubUser2}
            </li>
          ))}
        </ul>
      </div>
    </div>

  )
};
export default Dashboard;
