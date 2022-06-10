import { Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../BrandLogo';
import { useUserAuth } from '../../contexts/AuthContext';
import GetUser from '../GetUser';

export default function NavbarGetStarted({ children }) {
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
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/allcourses">Browse Courses</Nav.Link>

            <Nav.Link
              className="teachsignupbutton"
              href={currentUser ? '/teacherdashboard' : '/signup'}
            >
              Teach
            </Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            {!currentUser && <Nav.Link href="/signup">Sign Up</Nav.Link>}
            {!currentUser && <Nav.Link href="/signin">Sign In</Nav.Link>}
            {currentUser && (
              <Nav.Link href="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
            )}
            {currentUser && (
              <Nav.Link href="/userprofile">{currentUser.email}</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
