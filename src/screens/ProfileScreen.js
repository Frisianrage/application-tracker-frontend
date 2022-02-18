import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Button, Form, Row, Col} from 'react-bootstrap'

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [mobile, setMobile] = useState('')
    const [telephone, setTelephone] = useState('')
    const [resume, setResume] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const token = localStorage.getItem('jwtToken')
    
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    }

    const getUser = async () => {
      const {data} = await axios.get('/api/users/profile', config)

      if(data) {
        setFirstName(data.firstname)
        setLastName(data.lastname)
        setEmail(data.email)
        setAddress(data.address?.address)
        setAddressTwo(data.address?.addressTwo)
        setZipCode(data.address?.zip_code)
        setCity(data.address?.city)
        setCountry(data.address?.country)
        setMobile(data.mobile)
        setTelephone(data.telephone)
        setResume(data.resume?.content)
      } 
    }

    const updateUser = async () => {
      await axios.put('/api/users/profile', {firstName, lastName, address, addressTwo, city, zipCode, country, mobile, telephone, email}, config)
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

    if(resume){
      console.log(resume)
    }

    /*
     <Form.Group as={Col} controlId='resume'>
                    <Form.Label>Resume</Form.Label>
                    <Form.Control type='resume' placeholder='Enter your resume' value={resume} onChange={(e) => setResume(e.target.value)}></Form.Control>
                </Form.Group>
    */

    return (
      <Container>
        <Row>
            <h2 className="p-3"><u>User Profile</u></h2>
            <Form onSubmit={submitHandler}>
               
            
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