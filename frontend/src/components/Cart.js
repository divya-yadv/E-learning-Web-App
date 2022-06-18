import React, { useState } from 'react';
import { Store } from '../store';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from './MessageBox';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';
import Course from './Course';
import axios from 'axios';
import getError from '../utils';
import Cartitem from './cartitem';

export default function AddCart() {
  const { currentUser } = useUserAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();

  const checkoutHandler = async () => {
    return currentUser ? navigate('/payment') : navigate('/signin');
  };
  return (
    <div className="mt-5">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Buy Courses</h1>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      <Row className="mt-5">
        <Col md={8}>
          {cart.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/allcourses">Browse Courses</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item key={item} className="mb-5 p-3">
                  <Cartitem id={item} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cart.length === 0}
                    >
                      {currentUser ? 'Proceed to Buy Courses' : 'Sign In first'}
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
