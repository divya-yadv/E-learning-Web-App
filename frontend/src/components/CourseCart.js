import React from 'react';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import getError from '../utils';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';

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

function CourseOwned(props) {
  const { id } = props;
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
  return (
    <Card className="shadow">
    <Helmet>
      <title>Educaify</title>
    </Helmet>
      <Link to={`/courses/cart/slug/${course.slug}`}>
        <Card.Img
          className="card-img-top imagewidth"
          src={course.thumbnail}
          alt={course.Course_name}
        />
      </Link>
      <Card.Body>
        <Link className="title" to={`/courses/cart/slug/${course.slug}`}>
          <Card.Title>{course.Course_name}</Card.Title>
        </Link>
        <Card.Text>
          By <strong>{course.course_instructor}</strong>
        </Card.Text>
        <Rating rating={course.rating} numReviews={course.numReviews} />
        <Card.Text>
          <strong>${course.price}</strong>
        </Card.Text>
        <Button
          onClick={() => {
            navigate('/cart');
          }}
        >
          Buy now
        </Button>
      </Card.Body>
    </Card>
  );
}
export default CourseOwned;
