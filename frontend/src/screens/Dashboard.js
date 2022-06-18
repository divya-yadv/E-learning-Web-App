import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Course from '../components/Course';
import { Store } from '../store';
import CourseOwned from '../components/CourseOwned';
export default function Dashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div>
      <Sidebar />
      <div className="mt-4">
        {userInfo && userInfo.buyedCourses.length !== 0 && (
          <div className="mt-4">
            <h1>Your Courses</h1>
            <Row style={{marginRight:"18rem"}}>
              {userInfo &&
                userInfo.buyedCourses.map((id, index) => (
                  <Col key={index} sm={6} md={4} lg={4} className="mb-5 mt-5">
                    <CourseOwned id={id} />
                  </Col>
                ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
