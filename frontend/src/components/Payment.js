import React, { useContext, useState } from 'react';
import { useNewUserAuth } from './GetUser';
import { useUserAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Store } from '../store';
import { useNavigate } from 'react-router-dom';
import getError from '../utils';
import Loading from './Loading';
import MessageBox from './MessageBox';

export default function Payment() {
  const { user } = useNewUserAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const checkoutHandler = async () => {
    try {
      setLoading(false);
      setError('');
      try {
        const res = await axios.post('/api/users/buy', {
          email: user.email,
          cart: cartItems,
        });
      } catch (error) {
        setError(error);
      }
    } catch (error) {
      getError(error);
    }
    setLoading(false);
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div onLoad={checkoutHandler} className="teachsignupbar p-5 text-center h4">
      Congratulations, Go back to Dashboard and Start Learning!
    </div>
  );
}
