import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import { useNewUserAuth } from '../GetUser';
import { useUserAuth } from '../../contexts/AuthContext';
export default function NavbarUpdateprofile() {
  // const { user } = useNewUserAuth();
  const { currentUser } = useUserAuth();
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-0 nav-tabs homenavbar" navbarScroll>
            <Link className="nav-link" to="/dashboard">
              Go to Dashboard
            </Link>
            {currentUser && (
              <Link className="nav-link" to="/updateprofile">
                {currentUser.email}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
