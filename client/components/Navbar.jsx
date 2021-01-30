import React from 'react';
import logo from '../images/logo.png'

const Navbar = () => (
  <div className="navbar">
    <img className="navbar__logo" src={logo} alt="broChat logo" />
    <button id="navbar-button">
      <svg className="navbar__hamburger" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 60 60">
        <path id="Path_18" data-name="Path 18" d="M3,66H63V56H3ZM3,41H63V31H3ZM3,6V16H63V6Z" transform="translate(-3 -6)" fill="#fff"/>
      </svg>
    </button>
  </div>
);

export default Navbar;
