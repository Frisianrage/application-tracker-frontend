import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Table, Row, Col } from 'react-bootstrap';

function LastApplication() {
  const [userData, setUserData] = useState('');
  const [isLoading, setIsLoading] = useState('false');

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get('/api/applications/lastchanged', {
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
            <u>Last changed Application</u>
          </h5>
        </Col>
      </Row>
      <Table striped bordered hover responsive="sm" className="table-sm">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>COMPANY</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.applications[0] ? (
            <LinkContainer to={`/applications/${userData.applications[0]._id}`}>
              <tr>
                <td>{userData.applications[0].jobtitle}</td>
                <td>{userData.applications[0].company.employer.companyname}</td>

                <td>{userData.applications[0].status}</td>
              </tr>
            </LinkContainer>
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

export default LastApplication;

/*<td>
{moment(userData.applications[0].createdAt).format(
  'MM/DD/YY'
)}
</td>
*/
