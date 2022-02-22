import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';
import {Container, Button, Form, Row, Col} from 'react-bootstrap'

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [mobile, setMobile] = useState('')
    const [telephone, setTelephone] = useState('')
    const [resume, setResume] = useState({})
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const params = useParams()

    const token = localStorage.getItem('jwtToken')
    
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    }

    const getUser = async () => {
      let data

      if(params && params.id){
        data = await axios.get(`/api/users/${params.id}`, config)
      } else {
        data = await axios.get('/api/users/profile', config)
      }
      
      if(data) {
        setFirstName(data.data.firstname)
        setLastName(data.data.lastname)
        setEmail(data.data.email)
        setAddress(data.data.location.address)
        setAddressTwo(data.data.location.addressTwo)
        setZipCode(data.data.location.zip_code)
        setCity(data.data.location.city)
        setState(data.data.location.state)
        setCountry(data.data.location.country)
        setMobile(data.data.mobile)
        setTelephone(data.data.telephone)
        setResume(data.data.resume)
      } 
    }

    const updateUser = async () => {
      await axios.put('/api/users/profile', {firstName, lastName, address, addressTwo, city, zip_code: zipCode, state, country, mobile, telephone, email}, config)
    }
    
    useEffect(() => {
      getUser()
    },[])
    
    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
          console.log('Password do not match!')
      } else {
          updateUser()
      }
    }

    const uploadResume = async (e) => {
      setResume(e)
      await axios.put('/api/users/profile/resume', e, config)
      getUser()
    }

    const deleteResume = async() => {
      setResume({})
      await axios.put('/api/users/profile/resume', {content: "", type: "", date: "", name: ""}, config)
      getUser()
    }

    return (
      <Container>
        <Row>
          <Form onSubmit={submitHandler}>
            <Row>
              <h2 className="p-3" style={{ width: '50%'}}><u>User Profile</u></h2>
              <Form.Group as={Col} className="p-3" controlId='resume' style={{ width: '50%'}}>
                <Form.Label >Resume</Form.Label><br/>
                  {resume && resume.content? (
                    <div>
                      <div style={{width: "50%", display: "inline-block"}}>
                        <a rel="noreferrer" href={resume.content} title={resume.name} target="_blank">{resume.name}</a>
                      </div>
                      <div onClick={deleteResume} className="pt-3" style={{fontSize: "18px", width: "50%", display: "inline-block"}}>
                        <i className="fas fa-trash-alt"></i>
                      </div>
                    </div >
                  ) : (
                      <FileBase type="file"  multiple={false} onDone={(e) => uploadResume(e)} />
                  )}  
              </Form.Group>
            </Row>
            <Row className="my-3">
              <Form.Group as={Col} controlId='firstname'>
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control type='firstname' placeholder='Enter your firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId='lastname'>
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control type='lastname' placeholder='Enter your lastname' value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
              </Form.Group>
            </Row>
            <Row className="my-3 py-3">
              <Form.Group as={Col} controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type='email' placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId='mobile'>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type='mobile' placeholder='Enter your mobile number' value={mobile} onChange={(e) => setMobile(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId='telephone'>
                  <Form.Label>Telephone</Form.Label>
                  <Form.Control type='telephone' placeholder='Enter your telephone number' value={telephone} onChange={(e) => setTelephone(e.target.value)}></Form.Control>
              </Form.Group>
            </Row>
            <Row className="my-3 py-3">
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='adress' placeholder='Enter your adress' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='addressTwo' className="pt-3">
                    <Form.Label>Address2</Form.Label>
                    <Form.Control type='adressTwo' placeholder='Enter your adress' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)}></Form.Control>
                </Form.Group>
            </Row>
            <Row className="my-3 py-3">
                <Form.Group as={Col} controlId='zip'>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type='zip' placeholder='Enter your zip code' value={zipCode} onChange={(e) => setZipCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='city' placeholder='Enter your city code' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control type='state' placeholder='Enter your state code' value={state} onChange={(e) => setState(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='country' placeholder='Enter your country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
              </Form.Group>
            </Row>
            <Row className="my-3 py-3">
            <Form.Group as={Col} controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            </Row>
            <Button type='submit' variant='primary'>
                Update
            </Button>
          </Form> 
        </Row>
      </Container>  
    )
}


export default ProfileScreen