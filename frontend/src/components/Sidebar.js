import React, { useState } from 'react';
import {
  Button,
  Col,
  Figure,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';
import profile from '../assests/blank.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';

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
    <div className="sidenavbar">
      <Navbar bg="light" variant="light" expand="xl">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav navbarScroll className="sidebarcolumn">
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <Col className="sidebarcolumn">
              <Row className="profilediv mt-5">
                <Figure>
                  <Figure.Image
                    width={150}
                    height={150}
                    className="profilepic"
                    alt="profile"
                    src={currentUser.photoURL || profile}
                  />
                </Figure>
              </Row>
              <Row>
                <Button
                  onClick={() => {
                    <Navigate to="/user/updateprofile" />;
                  }}
                  className="btn btn-primary"
                >
                  Update Profile
                </Button>
              </Row>
              <Row>
                <Link className="nav-link" to="/about">About</Link>
              </Row>
              <Row>
                <Link className="nav-link" to="/allcourses">Contact Us</Link>
              </Row>
              <Row>
                <Button onClick={handleLogoutClick} className="btn btn-danger">
                  Logout
                </Button>
              </Row>
            </Col>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
