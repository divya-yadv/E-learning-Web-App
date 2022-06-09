import React from 'react';
import { Button, Container, Figure, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assests/Brand.png';

export default function CreateCourseNavbar() {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Figure>
              <Figure.Image
                width={300}
                height={300}
                className="rounded ms-1 mb-2 mt-2"
                alt="logo"
                src={logo}
              />
            </Figure>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-0 nav-tabs homenavbar"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link href="/teachdashboard">Go to Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
