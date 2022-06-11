import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Course from '../components/Course';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import { Link } from 'react-router-dom';
import photo from '../assests/getStarted.jpg';
import { useUserAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

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
function GetStarted() {
  const { currentUser } = useUserAuth();

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
        <title>Educatify</title>
      </Helmet>
      <Container className="container-small get-started">
        <Card>
          <Row>
            <Col sm={12} md={6} className="gettext">
              <h2 className="mb-5 pt-5 line-height-2.5">
                Success comes with great knowledge and immense hardwork
              </h2>
              <Card.Text>
                Put your hardwork at right place with our guidance. Our courses
                provide vast knowlege in different fields with the ease at your
                home.Learn anywhere, anytime you want.
              </Card.Text>
              <Button
                onClick={() => {
                  currentUser ? (
                    <Navigate to="dashboard" />
                  ) : (
                    <Navigate to="/signup" />
                  );
                }}
              >
                <Link to={currentUser ? '/dashboard' : '/signup'}>
                  Get Started
                </Link>
              </Button>
            </Col>
            <Col sm={12} md={6}>
              <img src={photo} alt=" a girl with laptop" />
            </Col>
          </Row>
        </Card>
      </Container>
      <h1 className="mt-5 mb-5"> Courses</h1>
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

export default GetStarted;
