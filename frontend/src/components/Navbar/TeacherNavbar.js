import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import { Store } from '../../store';
import CartIcon from '../CartIcon';
export default function TeacherNavbar() {
  const { currentUser } = useUserAuth();
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-0 nav-tabs homenavbar" navbarScroll>
            {currentUser && (
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            )}
            <Link className="nav-link" to="/allcourses">
              Browse Courses
            </Link>
            <CartIcon />
            {currentUser && userInfo && (
              <Link className="nav-link" to="/updateprofile">
                {userInfo.name}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
