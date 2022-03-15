import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoText from "../assets/images/logo-text.png";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h5>
          David Chou |  Lauren Darrimon | Jose Pascual
        </h5>
        <img src={logoText} alt="white and pink Git Match logo" style={{width: '300px', padding: '20px'}} />
        <div>
        <button
            className="btn btn-dark mb-3"
            onClick={() => navigate("/about")}
          >
            &larr; ABOUT
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;