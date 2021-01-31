import React from "react";
import logo from "../images/logo.png";
import togglerClose from "../images/toggler--close.svg";
import togglerOpen from "../images/toggler--open.svg";

const Navbar = ({ setIsMenuOpen, isMenuOpen }) => {
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <img className="navbar__logo" src={logo} alt="broChat logo" />
      <img
        onClick={handleMenu}
        className="navbar-toggler"
        src={isMenuOpen ? togglerOpen : togglerClose}
        alt=""
      />
    </div>
  );
};

export default Navbar;
