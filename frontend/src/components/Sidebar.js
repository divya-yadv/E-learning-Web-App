import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Figure,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';
import profile from '../assests/blank.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { currentUser, logOut, deleteuser } = useUserAuth();
  const [error, setError] = useState('');
  let navigate = useNavigate();
  async function handleLogoutClick() {
    setError('');
    try {
      await logOut();
      navigate('/signin');
    } catch (err) {
      setError('Failed to logout!');
    }
  }
  async function handledeleteClick() {
    setError('');
    try {
      await deleteuser();
      navigate('/signin');
    } catch (err) {
      setError(err);
    }
  }
  return (
    <Container className="sidenavbar d-flex">
      <Navbar bg="light" variant="light" expand="xl">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav navbarScroll className="sidebarcolumn">
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <Col className="sidebarcolumn">
              <Row className="profilediv">
                <Figure>
                  <Figure.Image
                    width={150}
                    height={150}
                    className="profilepic"
                    alt="profile"
                    src={profile}
                  />
                </Figure>
              </Row>
              <Row>
                <Nav.Link href="/about">About</Nav.Link>
              </Row>
              <Row>
                <Nav.Link href="/allcourses">Contact Us</Nav.Link>
              </Row>
              <Row>
                <Button onClick={handleLogoutClick} className="btn btn-danger">
                  Logout
                </Button>
              </Row>
              <Row>
                <Button onClick={handledeleteClick} className="btn btn-danger">
                  Delete Account
                </Button>
              </Row>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
