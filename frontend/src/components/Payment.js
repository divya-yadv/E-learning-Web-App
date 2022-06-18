import React, { useContext, useState } from 'react';
import { useUserAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Store } from '../store';
import getError from '../utils';
import Loading from './Loading';
import MessageBox from './MessageBox';
import { Button } from 'react-bootstrap';

export default function Payment() {
  const { currentUser } = useUserAuth();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState('none');
  var newCart = [...new Set([...userInfo.cart, ...userInfo.buyedCourses])];
  const checkoutHandler = async () => {
    try {
      setLoading(false);
      setError('');
      try {
        const res = await axios.post('/api/users/buy', {
          email: currentUser.email,
          cart: newCart,
        });
        ctxDispatch({ type: 'UPDATE_USER', payload: res.data });
        setDisplay('notnone');
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
    <div>
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
