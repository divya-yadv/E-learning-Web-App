import React from 'react';
import { Col, Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import { useNewUserAuth } from '../components/GetUser';
import Course from '../components/Course';
export default function Dashboard() {
  const { user } = useNewUserAuth();
  return (
    <div>
      <Sidebar />
      <Container className="mt-4">
        <h1>My courses</h1>
        {user &&
          user.buyedCourses.map((course) => {
            <Col key={course.slug} sm={6} md={4} lg={4} className="mb-5 mt-5">
              <Course course={course} />
            </Col>;
          })}
      </Container>
    </div>
  );
}
