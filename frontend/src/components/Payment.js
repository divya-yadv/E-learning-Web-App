import React, { useContext, useState } from 'react';
import { useUserAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Store } from '../store';
import getError from '../utils';
import Loading from './Loading';
import MessageBox from './MessageBox';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Payment() {
  const { currentUser } = useUserAuth();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState('none');
  var newCart = [...new Set([...userInfo.cart, ...userInfo.buyedCourses])];
  const checkoutHandler = async () => {
    try {
      setLoading(false);
      setError('');
      try {
        const result = await axios.post('/api/users/buy', {
          email: userInfo.email,
          cart: newCart,
        });
        await ctxDispatch({ type: 'UPDATE_USER', payload: result.data });
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        const res = await ctxDispatch({
          type: 'CART_EMPTY',
          payload: '',
        });
        localStorage.setItem('cartItems', []);
        setDisplay('...');
      } catch (err) {
        getError(err);
      }
    } catch (err) {
      getError(err);
    }
    setLoading(false);
  };
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
    <Helmet>
      <title>Educaify</title>
    </Helmet>
      {display === 'none' ? (
        <div>
          <h1 className="mt-5">Select Payment Method</h1>
          <div className="mt-5">
            <div className="mt-5">
              <input type="radio" id="paypal" name="paymenttype" value="CSS" />
              <label htmlFor="paypal">PayPal</label>
            </div>
            <div className="mt-3">
              <input type="radio" id="stripe" name="paymenttype" value="CSS" />
              <label htmlFor="stripe">Stripe</label>
            </div>

            <Button className="mt-4" onClick={checkoutHandler}>
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="teachsignupbar p-5 text-center h4">
          Congratulations, Go back to Dashboard and Start Learning!
        </div>
      )}
    </div>
  );
}
