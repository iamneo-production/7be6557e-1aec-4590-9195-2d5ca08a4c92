import React from 'react';
import '../Assets/styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, turpis eget fermentum sagittis, nunc lacus elementum
            odio, at fringilla odio leo sit amet est.
          </p>
        </div>
        <div className="footer__right">
          <h3>Contact Us</h3>
          <ul>
            <li>Email: info@example.com</li>
            <li>Phone: +1 123 456 7890</li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2023 JobSeeker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
