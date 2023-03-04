import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Table, Row, Col } from 'react-bootstrap';

function MostAppliedEmployer() {
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState('false');

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get('/api/employers/mostapplied', {
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
            <u>Most applied employer</u>
          </h5>
        </Col>
      </Row>
      <Table striped bordered hover responsive="sm" className="table-sm">
        <thead>
          <tr>
            <th>COMPANY</th>
            <th>LOCATION</th>
            <th>JOBS</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData[0] ? (
            userData.map((employer) => (
              <LinkContainer
                key={employer._id}
                to={`/employers/profile/${employer._id}`}
              >
                <tr>
                  <td>{employer.companyname}</td>
                  <td>{employer.location.city}</td>
                  <td>{employer.applications.length}</td>
                </tr>
              </LinkContainer>
            ))
          ) : (
            <tr>
              <td>NO EMPLOYERS FOUND!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default MostAppliedEmployer;
