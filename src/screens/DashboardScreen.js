import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MostRecentApp from '../components/MostRecentApp';
import MostAppliedEmployer from '../components/MostAppliedEmployer'
import LastApplication from '../components/LastApplication'
import LastEmployer from '../components/LastEmployer'

function DashboardScreen() {
  return (
    <Container>
      <Row className="align-items-center">
          <Col className="my-3">
              <h2><u>Dashboard</u></h2>
          </Col>
        </Row>
      <Row className="m-1">
        <Col className="m-2 p-2" style={{border: "solid lightgrey 1px", borderRadius: "10px"}}>
          <MostRecentApp />
        </Col>
        <Col className="m-2 p-2" style={{border: "solid lightgrey 1px", borderRadius: "10px"}}>
          <MostAppliedEmployer />
        </Col>
      </Row>
      <Row className="p-2 mx-3 my-5" style={{border: "solid lightgrey 1px", borderRadius: "10px"}}>
        <LastApplication />
      </Row>
      <Row className="p-2 mx-3 my-5" style={{border: "solid lightgrey 1px", borderRadius: "10px"}}>
        <LastEmployer />
      </Row>
    </Container>   
  );
}

export default DashboardScreen