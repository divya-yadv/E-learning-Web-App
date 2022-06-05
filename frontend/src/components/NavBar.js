import React from 'react';
import {
  Navbar,
  Container,
  Figure,
  Nav,
  NavDropdown,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assests/Brand.png';

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Figure className>
              <Figure.Image width={60} height={50} alt="100x50" src={logo} />
            </Figure>
          </Navbar.Brand>
        </LinkContainer>

        <Form className="d-flex search-box  ">
          <FormControl
            className=" me-2 text-start"
            type="search"
            placeholder="Search courses"
            aria-label="Search"
          />
          <Button variant="outline-success" className="bg-white text-black">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
        </Form>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-2 nav-tabs homenavbar"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Nav.Link className="active" href="#action1">
              Home
            </Nav.Link>
            <Nav.Link href="#action2">Courses</Nav.Link>
            <Nav.Link href="#">Sign Up</Nav.Link>
            <Nav.Link href="#">Sign In</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
