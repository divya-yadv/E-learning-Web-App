import React from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Container>
        <h1>My courses</h1>
      </Container>
    </div>
  );
}
