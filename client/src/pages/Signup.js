import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER, ADD_PROJECT} from '../utils/mutations';
import  API  from '../utils/fetch';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        githubUser: '',
        password: '',
        email: ''
    });
    const [signup, { error, data }] = useMutation(ADD_USER);
    const [addProject] = useMutation(ADD_PROJECT)
  
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // const fetchedUser = await API.fetchUser(formState.githubUser);
            // console.log({...formState, ...fetchedUser});

            const { data } = await signup({
                variables: { 
                  ...formState,
                  //...fetchedUser
                  // projects: fetchedProjects 
                },
            });        
            

            
            console.log(data);

            // const fetchedProjects = await API.fetchStarred(formState.githubUser);
            // console.log(fetchedProjects);
            // for (let i = 0; i<fetchedProjects.length; i++) {
            //   console.log(i,fetchedProjects[i]);
            //   const myObj = {...fetchedProjects[i], githubUser: formState.githubUser};
            //   console.log('myobj');
            //   console.log(myObj);
            //   const { projectData } = addProject({
            //     variables: myObj
            //   });
            //   console.log('projectData', projectData);
            // }


            Auth.login(data.signup.token);
            
            // const { projectData } = await addProject({
            //   variables: 
            // })
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="card">
              <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
              <div className="card-body">
                {data ? (
                  //  window.location.assign('/me');
                  <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      className="form-input"
                      placeholder="Your github User"
                      name="githubUser"
                      type="text"
                      value={formState.githubUser}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-block btn-info"
                      style={{ cursor: 'pointer' }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
    
                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      );
};

export default Signup;