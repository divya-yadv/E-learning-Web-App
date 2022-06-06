import React from 'react';
import { Container, Figure, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assests/Brand.png';
export default function NavbarSignup() {
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

        <Nav className="me-2 nav-tabs homenavbar">
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
