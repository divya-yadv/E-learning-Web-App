import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useUserAuth } from '../contexts/AuthContext';
import getError from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const AuthUserContext = React.createContext();

export function useNewUserAuth() {
  return useContext(AuthUserContext);
}

export function AuthUserProvider({ children }) {
  const { currentUser } = useUserAuth();
  const email = currentUser ? currentUser.email : '';
  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    user: {},
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/users/${email}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [email]);
  const value = {
    user,
  };
  return (
    <AuthUserContext.Provider value={value}>
      {!loading && children}
    </AuthUserContext.Provider>
  );
}
