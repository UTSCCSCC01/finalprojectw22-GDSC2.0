import React from "react";
import dsclogo from "../../images/dsclogo.png";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navbarmenu = () => {
  return (
    <Navbar collapseOnSelect expand="lg" top="fixed">
      <Container>
        <Nav.Link href="/">
          <img src={dsclogo} alt="dsc_logo" height="30px" />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/portal">Applications</Nav.Link>
            <Nav.Link href="/team">Team</Nav.Link>
            <Nav.Link href="/adminProfiles">Admins</Nav.Link>
            <Nav.Link href="/subscribe">Subscribe</Nav.Link>
            <Nav.Link href="/contactUs">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/myProfile">My Profile</Nav.Link>
            <Nav.Link href="/signOut">Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarmenu;
