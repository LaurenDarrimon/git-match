import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT} from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import  API  from '../utils/fetch'

const Dashboard = () => {
    const [toggle, setToggle] = useState({
        state: 'user'   
    });
    
    const [addProject, { error, data }] = useMutation(ADD_PROJECT);
    const fetchedProjects = API.fetchStarred(Auth.getProfile().data.githubUser);
    console.log(fetchedProjects);

    return (
        <div>
            <h5>{Auth.getProfile().data.githubUser} Dashboard</h5>
            <h4></h4>
        </div>
    )
};

export default Dashboard