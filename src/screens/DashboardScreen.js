import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import MostRecentApp from '../components/MostRecentApp';
import MostAppliedEmployer from '../components/MostAppliedEmployer';
import LastApplication from '../components/LastApplication';
import LastEmployer from '../components/LastEmployer';

function DashboardScreen() {
  const history = useNavigate();

  const token = localStorage.getItem('jwtToken');
  if (!token) {
    history('/');
  }

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="my-3">
          <h2>
            <u>Dashboard</u>
          </h2>
        </Col>
      </Row>
      <Row className="px-2">
        <Col
          className="m-2"
          style={{
            border: 'solid lightgrey 1px',
            borderRadius: '10px',
            padding: '0.5rem 0.75rem',
          }}
        >
          <MostRecentApp />
        </Col>
        <Col
          className="m-2"
          style={{
            border: 'solid lightgrey 1px',
            borderRadius: '10px',
            padding: '0.5rem 0.75rem',
          }}
        >
          <MostAppliedEmployer />
        </Col>
      </Row>
      <Row
        className="p-2 mx-1 my-5"
        style={{ border: 'solid lightgrey 1px', borderRadius: '10px' }}
      >
        <LastApplication />
      </Row>
      <Row
        className="p-2 mx-1 my-5"
        style={{ border: 'solid lightgrey 1px', borderRadius: '10px' }}
      >
        <LastEmployer />
      </Row>
    </Container>
  );
}

export default DashboardScreen;
