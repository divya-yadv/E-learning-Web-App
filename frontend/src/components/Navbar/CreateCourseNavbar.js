import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import { Store } from '../../store';
export default function CreateCourseNavbar() {
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
            {currentUser && <Link className="nav-link" to="/teacherdashboard">
              Go to Dashboard
            </Link>}
            {currentUser && userInfo && (
              <Link className="nav-link" to="/updateprofile">
                {userInfo.email}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
