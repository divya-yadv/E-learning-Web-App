import React, { useContext, useState } from 'react';
import { Button, Col, Figure, Nav, Navbar, Row } from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import MessageBox from './MessageBox';
import profile from '../assests/blank.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../store';

export default function Sidebar() {
  const { logOut } = useUserAuth();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [error, setError] = useState('');

  let navigate = useNavigate();
  async function handleLogoutClick() {
    setError('');
    try {
      await logOut();
      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cartItems');
      window.location.href = '/signin';
      navigate('/signin');
    } catch (err) {
      setError('Failed to logout!');
    }
  }
  function HandleClick() {
    return navigate('/updateprofile');
  }
  return (
    <div className="sidenavbar shadow1">
      <Navbar bg="light" variant="light" expand="sm">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav navbarScroll className="sidebarcolumn">
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <Col className="sidebarcolumn">
              <Row className="profilediv mt-5">
                <Figure>
                  <Figure.Image
                    width={200}
                    height={300}
                    className="profilepic"
                    alt="profile"
                    src={userInfo.image || profile}
                  />
                </Figure>
              </Row>
              <Row className="m-auto  justify-content-center text-center text-white h5 ">
                {userInfo.name}
              </Row>
              <Row>
                <Button
                  onClick={HandleClick}
                  className="btn btn-primary buttonsidebar"
                >
                  Update
                </Button>
              </Row>
              <Row className=" justify-content-center">
                <Link
                  className="nav-link text-center justify-content-center h5"
                  to="/about"
                >
                  About
                </Link>
              </Row>
              <Row className=" justify-content-center">
                <Link
                  className="nav-link text-center justify-content-center h5"
                  to="/allcourses"
                >
                  Contact Us
                </Link>
              </Row>
              <Row>
                <Button
                  onClick={handleLogoutClick}
                  className="btn btn-danger buttonsidebar"
                >
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
