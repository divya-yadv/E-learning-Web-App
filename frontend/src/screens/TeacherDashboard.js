import React, { useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GetCourse from '../components/GetCourse';
import { Store } from '../store';

function TeacherDashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <Container className="teacherdashboard">
      <Link to="/teach/createnewcourse">
        <Button className="teachsignupbutton">Create new course</Button>
      </Link>
      <h2 className="mt-5">Created Courses</h2>

      <Row className="mt-5">
        {userInfo.createdCourses &&
          userInfo.createdCourses.map((courseid, index) => (
            <Col key={index} sm={6} md={4} lg={4} className="mb-3">
              {console.log(courseid)};
              <GetCourse courseid={courseid._id} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default TeacherDashboard;
