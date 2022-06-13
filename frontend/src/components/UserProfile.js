import React from 'react';
import {Nav} from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import GetUser from './GetUser';
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
