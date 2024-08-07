import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css';

const Footer = () => {
  return <footer className="footer-container">
    <div className="copyright-container">
        <p>© 2024 RA Bookings</p>
    </div>
    <div className="rrss-container">
        <i className="bi bi-facebook"></i>
        <i className="bi bi-instagram"></i>
        <i className="bi bi-github"></i>
        <i className="bi bi-linkedin"></i>
    </div>
  </footer>;
};

export default Footer;
