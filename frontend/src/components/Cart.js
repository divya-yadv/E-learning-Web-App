import React from 'react';
import { Store } from '../store';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from './MessageBox';
import { Link, useNavigate } from 'react-router-dom';

export default function AddCart() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;
  console.log(cartItems);
  function removeItemHandler(item) {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }
  const checkoutHandler = () => {
    navigate('/signin?redirect=/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Buy Courses</h1>
      <Row>
        <Col>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/allcourses">Browse Courses</Link>
            </MessageBox>
          ) : (
            <div>
              {cartItems.map((item) => {
                return (
                  <div>
                    <li>{item.Course_name}</li>{' '}
                    <Button
                      onClick={() => removeItemHandler(item)}
                      variant="light"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                );
              })}
              <Button onClick={checkoutHandler}>Proceed to buy</Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
