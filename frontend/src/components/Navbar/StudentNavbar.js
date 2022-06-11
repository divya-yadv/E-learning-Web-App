import React, { useState, useContext } from 'react';
import { Container, Figure, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assests/Brand.png';
import { useUserAuth } from '../../contexts/AuthContext';
import BrandLogo from '../BrandLogo';

export default function StudentNavbar({ children }) {
  const { currentUser } = useUserAuth();
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-0 nav-tabs homenavbar"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link href="/allcourses">Browse Courses</Nav.Link>

            <Nav.Link className="teachsignupbutton" href="teacherdashboard">
              Teach
            </Nav.Link>

            {currentUser && (
              <Nav.Link href="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
            )}
            {currentUser && (
              <Nav.Link href="/dashboard">{currentUser.email}</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
