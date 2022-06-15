import React, { useState } from 'react';
import { Store } from '../store';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from './MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';
import Course from './Course';
import { withRouter } from 'react-router-dom';
import { useNewUserAuth } from './GetUser';
import axios from 'axios';
import getError from '../utils';

export default function AddCart() {
  const { currentUser } = useUserAuth();
  const { user } = useNewUserAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;
  function removeItemHandler(item) {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }
  const checkoutHandler = async () => {
    if (user) {
      try {
        setLoading(false);
        setError('');
        try {
          const res = await axios.post('/api/users/addcart', {
            email: user.email,
            cart: cartItems,
          });
        } catch (error) {
          setError(error);
        }
        navigate('/payment');
      } catch (error) {
        getError(error);
      }
      setLoading(false);
    } else {
      navigate('/signin');
    }
  };
  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Buy Courses</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/allcourses">Browse Courses</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="mb-5 p-3">
                  <Card>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <Link to={`/courses/slug/${item.slug}`}>
                          <img
                            className="img-fluid rounded img-thumbnail"
                            src={item.thumbnail}
                            alt={item.Course_name}
                          />
                        </Link>
                      </Col>
                      <Col md={5}>
                        <Link
                          className="title"
                          to={`/courses/slug/${item.slug}`}
                        >
                          <Card.Title>{item.Course_name}</Card.Title>
                        </Link>
                        <span
                          className=" text-wrap text-break"
                          style={{
                            width: '8rem',
                          }}
                        >
                          {item.description}
                        </span>
                        <p>
                          By <strong>{item.course_instructor}</strong>
                        </p>
                        <h3>${item.price}</h3>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <a href="/cart">
                          <Button
                            onClick={() => removeItemHandler(item)}
                            variant="light"
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </Card>
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
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Buy Courses
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
