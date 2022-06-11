import { Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function NavbarCourse({ children }) {
  const { currentUser } = useUserAuth();
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <BrandLogo />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-0 nav-tabs homenavbar"
            style={{ maxHeight: '200px' }}
            navbarScroll
          >
            <Link className="nav-link" to="/allcourses">Browse Courses</Link>
            {!currentUser && <Link className="nav-link" to="/signup">Sign Up</Link>}
            {!currentUser && <Link className="nav-link" to="/signin">Sign In</Link>}
            {currentUser && <Link className="nav-link" to="/userprofile">{currentUser.email}</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
