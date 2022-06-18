import React, { useEffect, useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from './axios';
import getError from '../utils';
import Loading from './Loading';
import MessageBox from './MessageBox';
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
  const id = props;
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
        <Card className="shadow ">
          <Link to={`/courses/yours/slug/${course.slug}`}>
            <Card.Img
              className="card-img-top imagewidth"
              src={course.thumbnail}
              alt={course.Course_name}
              height={250}
              width={250}
            />
          </Link>
          <Card.Body>
            <Link className="title" to={`/courses/yours/slug/${course.slug}`}>
              <Card.Title>{course.Course_name}</Card.Title>
            </Link>
            <Card.Text>{course.description}</Card.Text>
            <Rating rating={course.rating} numReviews={course.numReviews} />
            <Card.Text>
              <strong>${course.price}</strong>
            </Card.Text>
          </Card.Body>
          <Link
            className="text-decoration-none text-white"
            to={`/courses/update/slug/${course.slug}`}
          >
            <Button className="btn btn-primary w-100">Update Course</Button>
          </Link>
        </Card>
      )}
    </>
  );
}

export default GetCourse;
