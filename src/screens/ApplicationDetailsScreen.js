import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import { AuthContext } from '../context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import FindEmployer from '../components/FindEmployer';

const ApplicationDetailsScreen = () => {
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
  const [coverletter, setCoverletter] = useState('');
  const [findEmployerModal, setFindEmployerModal] = useState(false);
  const [isLoading, setIsLoading] = useState('false');

  const { id } = useParams();

  const history = useNavigate();

  const { user } = useContext(AuthContext);

  const token = localStorage.getItem('jwtToken');
  if (!token) {
    history('/');
  }

  const config = {
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const updateApplication = async () => {
    if (user && user.email === process.env.REACT_APP_DEMO_MAIL) {
      window.alert(
        'This application gets updated here! This is just a demo! No new application updated!'
      );
    } else {
      await axios.put(
        `/api/applications/${id}`,
        {
          jobtitle,
          jobdescription,
          salary,
          remote,
          city,
          state,
          country,
          name,
          phone,
          email,
          employer,
          status,
          source,
        },
        config
      );
    }
  };

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`/api/applications/${id}`, {
          baseURL: process.env.REACT_APP_BASEURL,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (data) {
          setJobtitle(data.jobtitle);
          setJobdescription(data.jobdescription);
          setSalary(data.salary);
          setRemote(data.remote);
          setCity(data.location.city);
          setState(data.location.state);
          setCountry(data.location.country);
          setEmployer(data.company.employer);
          setName(data.company.contactperson.name);
          setEmail(data.company.contactperson.email);
          setPhone(data.company.contactperson.phone);
          setStatus(data.status);
          setSource(data.source);
          setCoverletter(data.coverletter);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApplications();
    setIsLoading(false);
  }, [isLoading, token, id]);

  const submitHandler = (e) => {
    //e.preventDefault()
    updateApplication();
  };

  const uploadCoverletter = async (e) => {
    if (user && user.email === process.env.REACT_APP_DEMO_MAIL) {
      window.alert('You can upload a cover letter here');
    } else {
      setCoverletter(e);
      await axios.put(`/api/applications/${id}/coverletter`, e, config);
      setIsLoading(true);
    }
  };

  const deleteCoverletter = async () => {
    if (user && user.email === process.env.REACT_APP_DEMO_MAIL) {
      window.alert('You delete the cover letter here');
    } else {
      setCoverletter('');
      await axios.put(
        `/api/applications/${id}/coverletter`,
        { content: '', type: '', date: '', name: '' },
        config
      );
    }
  };

  return (
    <Container>
      <FindEmployer
        setFindEmployerModal={setFindEmployerModal}
        findEmployerModal={findEmployerModal}
        setEmployer={setEmployer}
      />
      <Row>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <h2 className="p-3">
                <u>Application details</u>
              </h2>
            </Col>

            <Form.Group
              as={Col}
              className="p-3 mb-4"
              controlId="coverletter"
              xs={12}
              md={6}
            >
              <Form.Label>Coverletter</Form.Label>
              <br />
              {coverletter && coverletter.content ? (
                <div>
                  <div style={{ width: '50%', display: 'inline-block' }}>
                    <a
                      rel="noreferrer"
                      href={coverletter.content}
                      title={coverletter.name}
                      target="_blank"
                    >
                      {coverletter.name}
                    </a>
                  </div>
                  <div
                    onClick={deleteCoverletter}
                    className="pt-3"
                    style={{
                      fontSize: '18px',
                      width: '50%',
                      display: 'inline-block',
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              ) : (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(e) => uploadCoverletter(e)}
                />
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Label as="h5" className="mt-1 mb-2">
              Details:
            </Form.Label>
            <Form.Group controlId="jobtitle" md={6}>
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
            <Form.Group controlId="jobdescription" md={6}>
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
            <Form.Label as="h5" className="mt-5 mb-2">
              Location:
            </Form.Label>
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
            <Form.Label as="h5" className="mt-5 mb-2">
              Employer:
            </Form.Label>
            <Form.Group controlId="employer">
              <Form.Label>
                Employer
                <Button
                  type="button"
                  style={{
                    borderColor: 'lightgray',
                    color: 'lightgray',
                    marginLeft: '3rem',
                  }}
                  variant="outline-primary"
                  onClick={() => setFindEmployerModal(true)}
                >
                  Edit Employer
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
            <Form.Label as="h5" className="mt-5 mb-2">
              Contact Person:
            </Form.Label>
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
                type="text"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Label as="h5" className="mt-5 mb-2">
              Status / Source:
            </Form.Label>
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
          <Container className="justify-content-center pt-3">
            <Button type="submit" variant="primary" className="mx-2 mb-5">
              Update
            </Button>
          </Container>
        </Form>
      </Row>
    </Container>
  );
};

export default ApplicationDetailsScreen;
