import React from 'react';
import { Container, Figure, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
export default function NavbarCart() {
  const { currentUser } = useUserAuth();
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Nav className=" nav-tabs homenavbar">
          <Link className="nav-link" to="/allcourses">
            Back to Browse Courses
          </Link>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          {currentUser && (
            <Link className="nav-link" to="/updateprofile">
              {currentUser.email}
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
