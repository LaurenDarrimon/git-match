import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Project(props) {
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
          {props.name}
          <br />
        </h4>
        <p className="card-text">{props.description}</p>
        <a
          href={props.repo_link}
          target="_blank"
          className="btn btn-primary gradient"
          rel="noreferrer"
        >
          Code
        </a>
      </div>
    </div>
  );
}