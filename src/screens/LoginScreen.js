import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useNavigate, Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { Form, Button, Container, Modal } from 'react-bootstrap';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(true);

  const history = useNavigate();

  const { user, login } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const onHide = () => {
    setShowModal(false);
    history('/');
  };

  useEffect(() => {
    if (user) {
      history('/dashboard');
    }
  }, [user, history]);

  return (
    <Modal
      onHide={onHide}
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as="h1" id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Container
              className="justify-content-center pt-3"
              style={{ display: 'flex' }}
            >
              <Button type="submit" variant="primary" className="mx-1">
                Login
              </Button>
              <Button onClick={onHide} variant="primary" className="mx-1">
                Cancel
              </Button>
            </Container>
          </Form>
        </FormContainer>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        No profile yet? To register click
        <Link to="/signin">here...</Link>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginScreen;
