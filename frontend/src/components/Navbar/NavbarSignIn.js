import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import CartIcon from '../CartIcon';
export default function NavbarSignup() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
         <BrandLogo />
        <Nav className="me-2 nav-tabs homenavbar">
          <Link className="nav-link" to="/">Back to Start Page</Link>
          <CartIcon />
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
