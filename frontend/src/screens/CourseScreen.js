import axios from '../components/axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import getError from '../utils';
import Content from '../components/Content';

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
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="coursescreendiv">
      <Row>
        <Col sm={12} md={6}>
          <Card className="align-center">
            <Card className="shadow ">
              <img
                className="img-large p-5 w-80"
                src={course.thumbnail}
                alt={course.Course_name}
              ></img>
            </Card>
            <Card className="shadow p-3">
              <ListGroup>
                <ListGroup.Item>
                  <Helmet>
                    <title>{course.Course_name}</title>
                  </Helmet>
                  <h1 className="title bg-black" style={{ color: 'white' }}>
                    {course.Course_name}
                  </h1>
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
                  {course.Requirements &&
                    course.Requirements.map((requirement, index) => {
                      return <span key={index}>{requirement}, </span>;
                    })}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Card>
        </Col>

        <Col sm={1} md={2}>
          <Card className="shadow sections">
            <h3>Course Sections</h3>
            <Content sections={course.CourseContent} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CourseScreen;
