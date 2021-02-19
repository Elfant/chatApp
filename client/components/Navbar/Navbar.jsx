import React from "react";

import styles from "./Navbar.scss";

import logo from "../../images/logo.png";
import togglerClose from "../../images/toggler--close.svg";
import togglerOpen from "../../images/toggler--open.svg";

const Navbar = ({ setIsMenuOpen, isMenuOpen }) => {
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.container}>
      <img className={styles.logo} src={logo} alt="broChat logo" />
      <img
        onClick={handleMenu}
        className={styles.toggler}
        src={isMenuOpen ? togglerOpen : togglerClose}
        alt=""
      />
    </nav>
  );
};

export default Navbar;
