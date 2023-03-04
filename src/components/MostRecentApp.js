import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Table, Row, Col } from 'react-bootstrap';

function MostRecentApp() {
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState('false');

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get('/api/applications/mostrecent', {
          baseURL: process.env.REACT_APP_BASEURL,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApplications();
    setIsLoading(false);
  }, [isLoading, token]);

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h5>
            <u>Most recent applications</u>
          </h5>
        </Col>
      </Row>
      <Table striped bordered hover responsive="sm" className="table-sm">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>COMPANY</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.applications[0] ? (
            userData.applications.map((application) => (
              <LinkContainer
                key={application._id}
                to={`/applications/${application._id}`}
              >
                <tr>
                  <td>{application.jobtitle}</td>
                  <td>{application.company.employer.companyname}</td>
                  <td>{moment(application.createdAt).format('MM/DD/YY')}</td>
                </tr>
              </LinkContainer>
            ))
          ) : (
            <tr>
              <td>NO APPLICATIONS FOUND!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default MostRecentApp;
