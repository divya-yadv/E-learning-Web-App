import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import GetCourse from '../components/GetCourse';
import Rating from '../components/Rating';
import { Store } from '../store';

function TeacherDashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <Container className="teacherdashboard">
      <Helmet>
        <title>Educaify</title>
      </Helmet>
      <Link to="/teach/createnewcourse">
        <Button className="teachsignupbutton">Create new course</Button>
      </Link>
      <h2 className="mt-5">Created Courses</h2>

      <Row className="mt-5">
        {userInfo.createdCourses &&
          userInfo.createdCourses.map((course, index) => (
            <Col key={index} sm={4} md={3} lg={3} className="mb-3">
              {console.log(course)};
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
                  <Link
                    className="title"
                    to={`/courses/yours/slug/${course.slug}`}
                  >
                    <Card.Title>{course.Course_name}</Card.Title>
                  </Link>
                  <Card.Text>{course.description}</Card.Text>
                  <Rating
                    rating={course.rating}
                    numReviews={course.numReviews}
                  />
                  <Card.Text>
                    <strong>${course.price}</strong>
                  </Card.Text>
                </Card.Body>
                <Link
                  className="text-decoration-none text-white"
                  to={`/courses/update/slug/${course.slug}`}
                >
                  <Button className="btn btn-primary w-100">
                    Update Course
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default TeacherDashboard;
