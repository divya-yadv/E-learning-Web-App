import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Section from './Section';

export default function Content(props) {
  const { count, setCount } = useState(0);
  const { sections } = props;
  return (
    <Col>
      {sections &&
        sections.map((section) => {
          setCount(count + 1);
          return (
            <Row sm={12} md={12} lg={12}>
              <Section section={section} count={count} />
            </Row>
          );
        })}
    </Col>
  );
}
