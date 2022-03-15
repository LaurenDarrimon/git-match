import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function Matches(props) {
  

  return (
    <div
      className="card portfolio-items col-md-5"
      data-aos="fade-up"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      <div className="card-body">
        <h4 className="card-title">
          {props.githubUser2}
          <br />
        </h4>
        <Link to={`/profiles/${props.githubUser2}`} 
        activeClassName="active" className="btn btn-primary">
          View Profile
          </Link>
      </div>
    </div>
  );
}