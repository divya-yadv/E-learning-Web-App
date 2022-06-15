import { Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNewUserAuth } from '../GetUser';
import CartIcon from '../CartIcon';

export default function NavbarAllcourses({ children }) {
  const { currentUser } = useUserAuth();
  // const { user } = useNewUserAuth();
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-0 nav-tabs homenavbar" navbarScroll>
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
                {currentUser.email}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
