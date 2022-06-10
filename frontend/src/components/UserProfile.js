import React from 'react';
import { Figure, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import GetUser from './GetUser';
import picture from '../assests/blank.jpg';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const { currentUser } = useUserAuth();
  const { user } = GetUser(currentUser.email);
  console.log(user);
  return currentUser ? (
    <Nav.Link href="/">{user.user_name}</Nav.Link>
  ) : (
    <Link to="/signin">Sign In</Link>
  );
}
