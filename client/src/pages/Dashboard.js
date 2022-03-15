// import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import { useQuery, useState, useMutation } from "@apollo/client";
import Matches from "../components/Matches";
import Auth from '../utils/auth';


const Dashboard = () => {
  const { githubUser } = useParams();

  const { loading, data } = useQuery(QUERY_ME)
  if (loading) {
    return <div>Loading...</div>;
  }
  const user = data?.me;
    // const matches = user.match;
    console.log(user)

    

  return (
    <div>
      <h5>{Auth.getProfile().data.githubUser} Dashboard</h5>
      <h4>Users Matches</h4>
      <div>
        
          {data.me.match.map((match) => (
            <Matches 
            key={match.githubUser2}
            githubUser2= {match.githubUser2}  
            />
          ))}
        
      </div>
    </div>

  )
};
export default Dashboard;
