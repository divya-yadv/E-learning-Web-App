import React, { useState, useContext } from 'react';
import { Container, Figure, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assests/Brand.png';

export default function NavbarGetStarted({ children }) {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Figure>
              <Figure.Image
                width={250}
                height={250}
                className="rounded ms-1 mb-1 mt-1"
                alt="logo"
                src={logo}
              />
            </Figure>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-2 nav-tabs homenavbar"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/allcourses">Browse Courses</Nav.Link>

            <Nav.Link className="teachsignupbutton" href="/teachsignup">
              Teach
            </Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>

            <Nav.Link href="/signin">Sign In</Nav.Link>

            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
