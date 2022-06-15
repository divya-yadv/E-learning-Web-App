import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import BrandLogo from '../BrandLogo';
import { useNewUserAuth } from '../GetUser';
import CartIcon from '../CartIcon';

export default function StudentNavbar({ children }) {
  const { currentUser } = useUserAuth();
  // const { user } = useNewUserAuth();
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
