import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Getcourse from '../components/Getcourse';
import { useNewUserAuth } from '../components/GetUser';

function TeacherDashboard() {
  const { user } = useNewUserAuth();
  return (
    <Container className="teacherdashboard">
      <Link to="/teach/createnewcourse">
        <Button className="teachsignupbutton">Create new course</Button>
      </Link>
      <Container className="mt-5">
        <h2>Created Courses</h2>
        <div className="courses mt-5">
          <Row>
            {user.createdCourses &&
              user.createdCourses.map((courseid, index) => (
                <Col key={index} sm={6} md={4} lg={4} className="mb-3">
                  <Getcourse courseid={courseid} />
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </Container>
  );
}

export default TeacherDashboard;
