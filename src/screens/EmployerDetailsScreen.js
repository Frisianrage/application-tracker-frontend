import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {Container, Button, Form, Row, Col} from 'react-bootstrap'

const EmployerDetailsScreen = () => {
    const [companyname, setCompanyname] = useState('')
    const [address, setAddress] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('WA')
    const [country, setCountry] = useState('US')
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState('')
    const [mobile, setMobile] = useState('')

    const {id} =useParams()

    const token = localStorage.getItem('jwtToken')
    
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    }

    const getEmployer = async () => {
      const {data} = await axios.get(`/api/employers/profile/${id}`, config)
     
      if(data) {
        setCompanyname(data.companyname)
        setAddress(data.location.address)
        setAddressTwo(data.location.addressTwo)
        setZipCode(data.location.zip_code)
        setCity(data.location.city)
        setState(data.location.state)
        setCountry(data.location.country)
        setEmail(data.email)
        setTelephone(data.telephone)
        setMobile(data.mobile)
      } 
    }

    const updateEmployer = async () => {
       await axios.put(`/api/employers/profile/${id}`, { companyname, address, addressTwo, zipCode, city, state, country, email, telephone, mobile}, config)
    }
    
    useEffect(() => {
        getEmployer()
    },[])
    
    const submitHandler = (e) => {
        e.preventDefault()
        updateEmployer() 
    }

    return (
      <Container>
        <Row>
            <Form onSubmit={submitHandler}>
                <Row>
                <h2 className="p-3" style={{ width: '50%'}}><u>Employer details</u></h2>
                </Row>
                <Row>
                    <Form.Label as="h5" className="mt-1 mb-2">
                        Companyname:
                    </Form.Label>
                    <Form.Group controlId='companyname'>
                        <Form.Control type='text' placeholder='Enter a companyname' value={companyname} onChange={(e) => setCompanyname(e.target.value)}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Label as="h5" className="mt-5 mb-2">
                        Location:
                    </Form.Label>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='text' placeholder='Enter a address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='addressTwo'>
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control type='text' placeholder='Enter a address' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='Enter a city' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='zipcode'>
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control type='text' placeholder='Enter a zip code' value={zipCode} onChange={(e) => setZipCode(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='jobdescription'>
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' placeholder='Enter your state' value={state} onChange={(e) => setState(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='Salary'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='text' placeholder='Enter a country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Label as="h5" className="mt-5 mb-2">
                        Contact:
                    </Form.Label>
                    <Form.Group as={Col} controlId='email'>
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='telephone'>
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type='text' placeholder='Enter your telephone' value={telephone} onChange={(e) => setTelephone(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='mobile'>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type='text' placeholder='Enter your mobile' value={mobile} onChange={(e) => setMobile(e.target.value)}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                </Row>
                <Container className="justify-content-center pt-3">
                    <Button type='submit' variant='primary' className="mx-2">
                        Update
                    </Button>
                </Container>
            </Form> 
        </Row>
      </Container>  
    )
}


export default EmployerDetailsScreen