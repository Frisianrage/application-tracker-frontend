import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import FormContainer from './FormContainer';
import FindEmployer from './FindEmployer';
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap';

const NewApplication = ({ showModal, setShowModal }) => {
  const [jobtitle, setJobtitle] = useState('');
  const [jobdescription, setJobdescription] = useState('');
  const [salary, setSalary] = useState('');
  const [remote, setRemote] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [employer, setEmployer] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [findEmployerModal, setFindEmployerModal] = useState(false);

  const history = useNavigate();

  const token = localStorage.getItem('jwtToken');

  const { user } = useContext(AuthContext);

  const config = {
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user && user.email === process.env.REACT_APP_DEMO_MAIL) {
      window.alert(
        'A new employer gets created here! This is just a demo! No new application created!'
      );
    } else {
      const newApp = await axios.post(
        '/api/applications',
        {
          jobtitle,
          jobdescription,
          salary,
          remote,
          location: {
            city,
            state,
            country,
          },
          company: {
            employer: employer._id,
            contactperson: {
              name,
              email,
              phone,
            },
          },
          status,
          source,
        },
        config
      );
      if (newApp) {
        onHide();
      }
    }
  };

  const onHide = () => {
    setShowModal(false);
    history('/applications');
  };

  return (
    <Modal show={showModal} centered id="mainModal">
      <FindEmployer
        setFindEmployerModal={setFindEmployerModal}
        findEmployerModal={findEmployerModal}
        setEmployer={setEmployer}
      />
      <Modal.Header>
        <Modal.Title as="h1">New Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Row>
              <Modal.Title as="h5" className="mt-1 mb-2">
                Details:
              </Modal.Title>
              <Form.Group controlId="jobtitle">
                <Form.Label>Jobtitle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a jobtitle"
                  value={jobtitle}
                  onChange={(e) => setJobtitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="jobdescription">
                <Form.Label>Jobdescription</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your jobdescription"
                  value={jobdescription}
                  onChange={(e) => setJobdescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="Salary" md={6}>
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="Remote" md={6}>
                <Form.Label>Remote</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your remote"
                  value={remote}
                  onChange={(e) => setRemote(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Modal.Title as="h5" className="mt-5 mb-2">
                Location:
              </Modal.Title>
              <Form.Group as={Col} controlId="city" md={4}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="state" md={4}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="country" md={4}>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Modal.Title as="h5" className="mt-5 mb-2">
                Employer:
              </Modal.Title>
              <Form.Group controlId="employer">
                <Form.Label>
                  Employer
                  <Button
                    size="sm"
                    type="button"
                    style={{
                      borderColor: 'lightgray',
                      color: 'lightgray',
                      marginLeft: '3rem',
                    }}
                    variant="outline-primary"
                    onClick={() => setFindEmployerModal(true)}
                  >
                    Find Employer
                  </Button>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your employer"
                  disabled
                  defaultValue={employer.companyname}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Modal.Title as="h5" className="mt-5 mb-2">
                Contact Person:
              </Modal.Title>
              <Form.Group as={Col} controlId="name" md={4}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="email" md={4}>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="phone" md={4}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Modal.Title as="h5" className="mt-5 mb-2">
                Status / Source:
              </Modal.Title>
              <Form.Group as={Col} controlId="status" md={6}>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="source" md={6}>
                <Form.Label>Source</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>

            <Container
              className="justify-content-center pt-3"
              style={{ display: 'flex' }}
            >
              <Button type="submit" variant="primary" className="mx-2">
                Save
              </Button>
              <Button onClick={onHide} variant="primary">
                Cancel
              </Button>
            </Container>
          </Form>
        </FormContainer>
      </Modal.Body>
    </Modal>
  );
};

export default NewApplication;
