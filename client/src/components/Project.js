import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom'


export default function Project(props) {
  

  return (
    <div
      className="card portfolio-items col-md-5"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      {/* <img
        className="card-img-top"
        src={props.}
        alt="development project thumbnail"
      /> */}
      <div className="card-body">
        <h3 className="card-title">
          {props.name}
          <br />
        </h3>
        <p className="card-text">{props.description}</p>
        <a
          href={props.repo_link}
          target="_blank"
          className="btn btn-primary"
          rel="noreferrer"
        >
          Code
        </a>
        {/* <a
          href={props.deployed_url}
          target="_blank"
          className="btn btn-primary"
          rel="noreferrer"
        >
          Site
        </a> */}
      </div>
    </div>
  );
}