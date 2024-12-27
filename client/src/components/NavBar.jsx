import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthProvider";
import "./NavBar.css";

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <Navbar expand="lg" className="navbar shadow-mg">
      <Container>
        {/* Brand name */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          PantryPal
        </Navbar.Brand>
        {/* Toggle button for smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation links */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/lists" className="nav-link">
              Lists
            </Nav.Link>
            <Button variant="outline-light" className="ms-3" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
