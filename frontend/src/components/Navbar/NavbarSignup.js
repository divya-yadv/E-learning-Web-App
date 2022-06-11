import React from 'react';
import { Container, Figure, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assests/Brand.png';
import BrandLogo from '../BrandLogo';
export default function NavbarSignup() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Nav className="me-2 nav-tabs homenavbar">
          <Link className="nav-link" to="/">
            Back to Start Page
          </Link>
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
