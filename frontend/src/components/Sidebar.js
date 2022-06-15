import React, { useState } from 'react';
import { Button, Col, Figure, Nav, Navbar, Row } from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';
import profile from '../assests/blank.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useNewUserAuth } from './GetUser';

export default function Sidebar() {
  const { currentUser, logOut, deleteuser } = useUserAuth();
  const { user } = useNewUserAuth();
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
  function HandleClick() {
    return navigate('/updateprofile');
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
      <Navbar bg="light" variant="light" expand="sm">
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
                    src={user.image || profile}
                  />
                </Figure>
              </Row>
              <Row className="m-auto text-white h5 ">{user.name}</Row>
              <Row>
                <Button onClick={HandleClick} className="btn btn-primary buttonsidebar">
                  Update Profile
                </Button>
              </Row>
              <Row>
                <Link className="nav-link text-center h5" to="/about">
                  About
                </Link>
              </Row>
              <Row>
                <Link className="nav-link text-center h5" to="/allcourses">
                  Contact Us
                </Link>
              </Row>
              <Row>
                <Button onClick={handleLogoutClick} className="btn btn-danger buttonsidebar">
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
