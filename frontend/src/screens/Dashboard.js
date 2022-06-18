import React, { useContext } from 'react';
import { Col, Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Course from '../components/Course';
import { Store } from '../store';
export default function Dashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div>
      <Sidebar />
      <Container className="mt-4">
        <h1>My courses</h1>
        {userInfo &&
          userInfo.buyedCourses.map((course) => {
            <Col key={course.slug} sm={6} md={4} lg={4} className="mb-5 mt-5">
              <Course course={course} />
            </Col>;
          })}
      </Container>
    </div>
  );
}
