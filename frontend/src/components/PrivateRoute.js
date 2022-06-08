import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';
export default function PrivateRoute({ children }) {
  const { currentUser } = useUserAuth();
  console.log(currentUser);
  return currentUser ? children : <Navigate to="/signin" />;
}
