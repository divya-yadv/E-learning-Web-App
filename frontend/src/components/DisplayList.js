import React from 'react';
import { Container } from 'react-bootstrap';

export default function DisplayList(props) {
  const { keywords } = props;
  return (
    <Container>
      <ul>
        {keywords.map((keyword) => {
          return <li>{keyword}</li>;
        })}
      </ul>
    </Container>
  );
}
