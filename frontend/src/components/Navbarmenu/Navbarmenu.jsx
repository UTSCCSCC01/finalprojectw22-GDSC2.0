import React, { useContext } from "react";
import dsclogo from "../../images/dsclogo.png";
import { Nav, Navbar, Container } from "react-bootstrap";
import DarkMode from "../DarkMode/DarkMode";
import "../DarkMode/DarkMode.css";
import DarkModeContext from "../../context/darkMode/DarkModeContext";
import SetRoleContext from "../../context/setRole/SetRoleContext"
import "./Navbarmenu.css";
const Navbarmenu = () => {
  const { mode, toggleMode } = useContext(DarkModeContext);
  const { isAdmin, changeRole } = useContext(SetRoleContext)
  const doesUserLoggedIn = localStorage.getItem("token");
  return (
    <Navbar
      className={mode === true ? "dark" : ""}
      collapseOnSelect
      expand="lg"
      top="fixed"
    >
      <Container>
        <Nav.Link href="/">
          <img src={dsclogo} alt="dsc_logo" height="30px" />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/portal">Applications</Nav.Link>
            <Nav.Link href="/resources">Resources</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/pastProjects">Past Projects</Nav.Link>
            <Nav.Link href="/admin/log">Admin</Nav.Link>
            {isAdmin &&
              <Nav.Link href="/admin/main">Admin Panel</Nav.Link>
            }
            {doesUserLoggedIn && (
              <>
                {/* <Nav.Link href="/adminProfiles">Admins</Nav.Link> */}

                {/* <Nav.Link href="/reportBug">Report Bug</Nav.Link> */}
                {/* <Nav.Link href="/reportBugLogs">Report Bug Logs</Nav.Link> */}
                {/* <Nav.Link href="/subscribe">Subscribe</Nav.Link>
                <Nav.Link href="/contactUs">Contact Us</Nav.Link> */}
              </>
            )}
          </Nav>
          <Nav>
            {doesUserLoggedIn && (
              <>
                <Nav.Link href="/myProfile">My Profile</Nav.Link>
                <Nav.Link href="/signOut">Sign Out</Nav.Link>
              </>
            )}
          </Nav>
          <DarkMode />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarmenu;
