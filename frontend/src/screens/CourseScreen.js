import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, course: action.payload, loading: false };
    case 'FECTH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CourseScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    course: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/course/${slug}`);
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FECTH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]); //empty array coz we gonnna run this function only once after rendering this component
  return loading ? (
    <div>loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col sm={12} md={6}>
          <Card>
            <img
              className="img-large"
              src={course.image}
              alt={course.Course_name}
            ></img>
            <ListGroup>
              <ListGroup.Item>
                <Helmet>
                  <title>{course.Course_name}</title>
                </Helmet>
                <h1 className="title">{course.Course_name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>{course.description}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>
                  <Rating
                    className="rating-inline"
                    rating={course.rating}
                    numReviews={course.numReviews}
                  />
                </span>

                <i className="fas fa-users" />
                <span> {course.enroll_students} students</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Created by </span>
                <span>
                  <strong>{course.course_instructor}</strong>
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>${course.price}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-lg">Add to cart</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <p className="center">30-Day Money-back Gurantee</p>
                <p className="center">Full Lifetime Access</p>
              </ListGroup.Item>
              <ListGroup.Item className="center">Share</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col sm={1} md={2}></Col>
      </Row>
    </div>
  );
}

export default CourseScreen;
