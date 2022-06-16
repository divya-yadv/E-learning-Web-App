import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../../store';
import CartIcon from '../CartIcon';

export default function NavbarGetStarted({ children }) {
  const { currentUser } = useUserAuth();
  const { state } = useContext(Store);
  const { cart } = state;
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
            <Link className="nav-link" to="/about">
              About
            </Link>
            <Link className="nav-link" to="/allcourses">
              Browse Courses
            </Link>

            <Link
              className="teachsignupbutton nav-link"
              to={currentUser ? '/teacherdashboard' : '/signup'}
            >
              Teach
            </Link>
            <Link className="nav-link" to="/contact">
              Contact Us
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
              <Link className="nav-link" to="/dashboard">
                {currentUser.email}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
