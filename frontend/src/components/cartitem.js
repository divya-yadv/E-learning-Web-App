import React, { useState } from 'react';
import { Store } from '../store';
import { useReducer, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import MessageBox from './MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import Course from './Course';
import axios from 'axios';
import getError from '../utils';
import { useUserAuth } from '../contexts/AuthContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, course: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function Cartitem(props) {
  const { currentUser } = useUserAuth();
  const { id } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const navigate = useNavigate();
  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    course: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/courses/id/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [id]);
  async function removeItemHandler(item) {
    await ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    try {
      if (currentUser) {
        const resu = userInfo.cart.filter((id) => id !== item);
        try {
          const result = await axios.post('/api/users/addcartall', {
            email: userInfo.email,
            cart: resu,
          });
          await ctxDispatch({ type: 'UPDATE_USER', payload: result.data });
          localStorage.setItem('userInfo', JSON.stringify(result.data));
        } catch (err) {
          getError(err);
        }
      }
    } catch (err) {
      getError(err);
    }
  }
  return (
    <Card>
      <Row className="align-items-center">
        <Col md={4}>
          <Link to={`/courses/slug/${course.slug}`}>
            <img
              className="img-fluid rounded img-thumbnail"
              src={course.thumbnail}
              alt={course.Course_name}
            />
          </Link>
        </Col>
        <Col md={5}>
          <Link className="title" to={`/courses/slug/${course.slug}`}>
            <Card.Title>{course.Course_name}</Card.Title>
          </Link>
          <span
            className=" text-wrap text-break"
            style={{
              width: '8rem',
            }}
          >
            {course.description}
          </span>
          <p>
            By <strong>{course.course_instructor}</strong>
          </p>
          <h3>${course.price}</h3>
        </Col>
        <Col md={1}></Col>
        <Col md={2}>
          <Button onClick={() => removeItemHandler(id)} variant="light">
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
