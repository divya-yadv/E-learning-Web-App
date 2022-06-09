import React, { useEffect, useReducer } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useUserAuth } from '../contexts/AuthContext';
import axios from 'axios';
import getError from '../utils';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import GetCourse from '../components/GetCourse';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function TeacherDashboard() {
  const { currentUser } = useUserAuth();
  const email = currentUser.email;

  const [{ loading, error, user }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    user: {},
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/users/${email}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [email]);

  return (
    <Container className="teacherdashboard">
      <Link to="/teach/createnewcourse">
        <Button className="teachsignupbutton">Create new course</Button>
      </Link>
      <Container className="mt-5">
        <h2>My Created Courses</h2>
        <div className="courses">
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {user.createdCourses &&
                user.createdCourses.map((courseid, index) => (
                  <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                    <GetCourse courseid={courseid} />
                  </Col>
                ))}
            </Row>
          )}
        </div>
      </Container>
    </Container>
  );
}

export default TeacherDashboard;
