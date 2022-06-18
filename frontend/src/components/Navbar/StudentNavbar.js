import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import CartIcon from '../CartIcon';
import { Store } from '../../store';
import { useContext } from 'react';
import { useUserAuth } from '../../contexts/AuthContext';

export default function StudentNavbar({ children }) {
  const {currentUser} = useUserAuth();
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-0 nav-tabs homenavbar" navbarScroll>
            <Link className="nav-link" to="/allcourses">
              Browse Courses
            </Link>

            <Link className="teachsignupbutton nav-link" to="/teacherdashboard">
              Teach
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
