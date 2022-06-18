import React from 'react';
import { Navigate} from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';
export default function PrivateRoute({ children }) {
  const { currentUser } = useUserAuth();
  return currentUser ? children : <Navigate to="/signin" />;
}
