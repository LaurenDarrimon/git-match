import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

export default function Matches(props) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
        <Link to={`/matches/${props.githubUser2}`}
          className="btn btn-primary gradient">
          View Profile
        </Link>
      </div>
    </div>
  );
}