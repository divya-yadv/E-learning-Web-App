import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CartIcon from '../CartIcon';
import { Store } from '../../store';
import { useContext } from 'react';

export default function NavbarAllcourses({ children }) {
  const { currentUser } = useUserAuth();
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <div className="input-group w-30">
          <input
            type="text"
            className="form-control"
            placeholder="search courses"
          />
          <div className="input-group-append">
            <button type="submit" className="btn-primary">
              <i className="fa fa-search p-2 "></i>
            </button>
          </div>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-0 nav-tabs homenavbar" navbarScroll>
            {currentUser && (
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            )}
            <Link
              className="teachsignupbutton nav-link"
              to={currentUser ? '/teacherdashboard' : '/signup'}
            >
              Teach
            </Link>
            {!currentUser && (
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            )}
            {!currentUser && (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
            <CartIcon />
            {currentUser && (
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
