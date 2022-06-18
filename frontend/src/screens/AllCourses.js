import React,{ useContext, useEffect, useReducer } from 'react';
import axios from '../components/axios';
import Course from '../components/Course';
import CourseOwned from '../components/CourseOwned';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import { useUserAuth } from '../contexts/AuthContext';
import { Store } from '../store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, courses: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function AllCourses() {
  const { currentUser } = useUserAuth();
  const { state } = useContext(Store);
  const { userInfo } = state;

  // const [courses, setCourses] = useState([]); // in order to save courses from backend
  const [{ loading, error, courses }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    courses: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      // dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/courses');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []); //empty array coz we gonnna run this function only once after rendering this component

  return (
    <div>
      <Helmet>
        <title>Educatify Courses</title>
      </Helmet>
      {userInfo && userInfo.buyedCourses.length !== 0 && (
        <div className="mt-4">
          <h1>Your Courses</h1>
          <Row>
            {userInfo && userInfo.buyedCourses.map((course) => (
              <Col key={course.slug} sm={6} md={4} lg={4} className="mb-5 mt-5">
                <CourseOwned course={course} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {userInfo && userInfo.cart.length !== 0 ? (
        <div className="mt-4">
          {console.log(userInfo)}
          <h1>Courses in Your Cart</h1>
          <Row>
            {userInfo && userInfo.cart.map((id, index) => (
              <Col key={index} sm={6} md={4} lg={4} className="mb-5 mt-5">
                <CourseOwned id={id} />
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
      <h1 className="mt-5 mb-5">All Courses</h1>
      <div className="courses">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {courses.courses.map((course) => (
              <Col key={course.slug} sm={6} md={4} lg={4} className="mb-5 mt-5">
                <Course course={course} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default AllCourses;
