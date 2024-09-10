import React from 'react';
import { Spinner } from 'react-bootstrap';
import "./Loader.css";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center loader-container">
      <Spinner animation="border" role="status" className="custom-spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
