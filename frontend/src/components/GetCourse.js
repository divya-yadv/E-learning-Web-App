import React, { useEffect, useReducer } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import axios from 'axios';
import getError from '../utils';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import Rating from './Rating';

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
function GetCourse(props) {
  const id = props.courseid;
  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    course: {},
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
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Card className="shadow">
          <Link to={`/courses/slug/${course.slug}`}>
            <Card.Img
              className="card-img-top"
              src={course.thumbnail}
              alt={course.Course_name}
            />
          </Link>
          <Card.Body>
            <Link className="title" to={`/courses/slug/${course.slug}`}>
              <Card.Title>{course.Course_name}</Card.Title>
            </Link>
            <Card.Text>{course.course_instructor}</Card.Text>
            <Rating rating={course.rating} numReviews={course.numReviews} />
            <Card.Text>
              <strong>${course.price}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default GetCourse;
