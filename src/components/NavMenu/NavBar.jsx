import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <div className={styles.fixed}>
      <Navbar
        className={styles.menu}
        collapseOnSelect
        sticky="top"
        bg="light"
        expand="lg"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FontAwesomeIcon color="white" size="lg" icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="/"
              exact
              activeClassName={styles.activepage}
              className={styles.navLink + " butn"}
              href="#home"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              exact
              activeClassName={styles.activepage}
              className={styles.navLink + " butn"}
            >
              About
            </NavLink>
            <NavLink
              to="/contacts"
              exact
              activeClassName={styles.activepage}
              className={styles.navLink + " butn"}
            >
              Contacts
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
