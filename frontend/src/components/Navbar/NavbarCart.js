import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import { Store } from '../../store';
import CartIcon from '../CartIcon';
import { useUserAuth } from '../../contexts/AuthContext';
export default function NavbarCart() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { currentUser } = useUserAuth();
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Nav className=" nav-tabs homenavbar">
          <CartIcon />
          <Link className="nav-link" to="/allcourses">
            Back to Browse Courses
          </Link>
          {currentUser && (
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          )}

          {currentUser && userInfo && (
            <Link className="nav-link" to="/updateprofile">
              {userInfo.name}
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
