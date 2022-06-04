import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Course from '../components/Course';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';

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
function HomeScreen() {
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
        <title>SmartLearn</title>
      </Helmet>
      <h1>Featured Courses</h1>
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
              <Col key={course.slug} sm={6} md={4} lg={3} className="mb-3">
                <Course course={course} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
