import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Section from './Section';

export default function Content(props) {
  const { sections } = props;
  return (
    <ol type="1">
      <Col>
        {sections &&
          sections.map((section, index) => {
            return (
              <li key={index}>
                <Row sm={12} md={12} lg={12}>
                  <Section section={section} />
                </Row>
              </li>
            );
          })}
      </Col>
    </ol>
  );
}
