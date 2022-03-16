import React, { useEffect } from "react";
import Form from "../components/Form";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section className="row section-top" id="contact">
      <div className="col-md-5 d-flex flex-column" id="contact-info">
          <br>
          </br>
          <br>
          </br>
        <h4>Contact the GitMatch Team</h4>
        <h6>With questions, comments, and details about contributing to this project!</h6>
      </div>

      <div className="col-md-5">
        <h2
          className="reach-out"
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          REACH <span className="serif">OUT</span>
        </h2>

        <div>
          <Form />
        </div>
      </div>
    </section>
  );
}
