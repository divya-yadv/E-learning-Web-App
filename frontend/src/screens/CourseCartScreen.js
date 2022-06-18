import axios from '../components/axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import { Store } from '../store';
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

function CourseCartScreen() {
  const params = useParams();
  const { slug } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { currentUser } = useUserAuth();
  const navigate = useNavigate();

  const [{ loading, error, course }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    course: [],
  }); // current state depends on previous state
  useEffect(() => {
    const fetchData = async () => {
      // dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/courses/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  // const changeLink = (link) => {
  //   let id = link.split('?v=')[1]; //sGbxmsDFVnE
  //   let newid = id.split('&')[0];
  //   var embedlink = 'http://www.youtube.com/embed/' + newid;
  //   return embedlink;
  // };

  // const newLink = course.CourseContent
  //   ? changeLink(course.CourseContent[0].link)
  //   : '';
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
    <Helmet>
      <title>Educaify</title>
    </Helmet>
      <div
        className="text-center h3"
        style={{
          backgroundImage:
            'linear-gradient(to right,rgba(255, 0, 0, 0),rgb(37, 95, 153) )',
          padding: '20px',
        }}
      >
        {course.Course_name}
      </div>
      <div className="coursescreendiv">
        <Row>
          <Col sm={12} md={6}>
            <Card className="shadow videospacecard border border-primary justify-content-center ">
              {/* {'' ? ( */}
              <img
                className="img-large imgcoursescreen"
                src={course.thumbnail}
                alt={course.Course_name}
              ></img>
              {/* ) : (
                <iframe
                  className="imgcoursescreen"
                  src={''}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              )} */}
            </Card>
            <Card className="mb-3">
              <h1
                className="title bg-black text-center m-0"
                style={{ color: 'white' }}
              >
                {course.Course_name}
              </h1>
            </Card>

            <Card className="shadow p-3">
              <ListGroup>
                <Helmet>
                  <title>{course.Course_name}</title>
                </Helmet>
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
                <Button
                  onClick={() => {
                    navigate('/cart');
                  }}
                >
                  Buy now
                </Button>
                <ListGroup.Item className="text-center">
                  <p>30-Day Money-back Gurantee</p>
                  <p>Full Lifetime Access</p>
                </ListGroup.Item>
                <ListGroup.Item className="text-center border-none">
                  Share
                </ListGroup.Item>
                <ListGroup.Item className="border">
                  <h3>Keywords</h3>
                  {course.keywords &&
                    course.keywords.map((keyword, index) => {
                      return (
                        <strong key={index}>
                          <span>{keyword}, </span>
                        </strong>
                      );
                    })}
                </ListGroup.Item>
                <ListGroup.Item className="border">
                  <h3>Requirements</h3>
                  <ul>
                    <Row>
                      {course.Requirements &&
                        course.Requirements.map((requirement, index) => {
                          return (
                            <Col
                              key={index}
                              sm={6}
                              className="text-wrap text-break"
                            >
                              <li>{requirement}</li>
                            </Col>
                          );
                        })}
                    </Row>
                  </ul>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Card className="shadow" style={{ height: '100vh' }}>
              <h3>Course Sections</h3>
              <ul>
                {course.CourseContent &&
                  course.CourseContent.map((section, index) => {
                    return (
                      <li key={index}>
                        <input
                          name="video"
                          key={index}
                          id={index}
                          type="radio"
                        />
                        <label htmlFor={index}>
                          {index + 1}
                          {''}
                          {section.title}
                        </label>
                      </li>
                    );
                  })}
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CourseCartScreen;
