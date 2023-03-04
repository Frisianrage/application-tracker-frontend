import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import FormContainer from './FormContainer';
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap';

const NewEmployer = ({ showModal, setShowModal }) => {
  const [companyname, setCompanyname] = useState('');
  const [address, setAddress] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('WA');
  const [country, setCountry] = useState('US');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [mobile, setMobile] = useState('');

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
        'A new employer gets created here! This is just a demo! No new emlpoyer created!'
      );
    } else {
      const newEmpl = await axios.post(
        '/api/employers',
        {
          companyname,
          location: {
            address,
            addressTwo,
            zip_code: zipCode,
            city,
            state,
            country,
          },
          telephone,
          email,
          mobile,
        },
        config
      );
      if (newEmpl) {
        onHide();
      }
    }
  };

  const onHide = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} centered id="mainModal">
      <Modal.Header>
        <Modal.Title as="h1">New Employer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Row>
              <Modal.Title as="h5" className="mt-1 mb-2">
                Company name:
              </Modal.Title>
              <Form.Group controlId="companyname">
                <Form.Control
                  type="text"
                  placeholder="Enter a company name"
                  value={companyname}
                  onChange={(e) => setCompanyname(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Modal.Title as="h5" className="mt-5 mb-2">
                Location:
              </Modal.Title>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="addressTwo">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your address"
                  value={addressTwo}
                  onChange={(e) => setAddressTwo(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="city" md={6} xl={3}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="zipCode" md={6} xl={3}>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="state" md={6} xl={3}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="country" md={6} xl={3}>
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
                Contact:
              </Modal.Title>
              <Form.Group as={Col} controlId="Email" md={4}>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="telephone" md={4}>
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="mobile" md={4}>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Row>
            <Container className="justify-content-center pt-3">
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

export default NewEmployer;
