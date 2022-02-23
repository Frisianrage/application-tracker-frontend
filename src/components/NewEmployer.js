import React, { useState } from 'react'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'
import FormContainer from './FormContainer'
import { Form, Button, Container, Modal, Row, Col } from 'react-bootstrap'

const NewEmployer = ({showModal, setShowModal}) => {
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
    
    //const history = useNavigate()
    const token = localStorage.getItem('jwtToken')
    
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const newEmpl = await axios.post('/api/employers', {
            companyname, 
            location: {
                address,
                addressTwo,
                zip_code: zipCode,
                city,
                state,
                country
            }, 
            telephone, 
            email,  
            mobile
        }, config) 
        if(newEmpl) {
            onHide()
        }
    }

    const onHide = () => {
        setShowModal(false)
        //history('/employers')
    }

    return (
        <Modal show={showModal} centered id="mainModal">
            <Modal.Header>
            <Modal.Title as="h1">
                New Employer
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormContainer>
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Modal.Title as="h5" className="mt-1 mb-2">
                                Company name:
                            </Modal.Title>
                            <Form.Group controlId='companyname'>
                                <Form.Control type='companyname' placeholder='Enter a company name' value={companyname} onChange={(e) => setCompanyname(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Modal.Title as="h5" className="mt-5 mb-2">
                                Location:
                            </Modal.Title>
                            <Form.Group controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='address' placeholder='Enter a address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='addressTwo'>
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control type='addressTwo' placeholder='Enter your address' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='city'>
                                <Form.Label>City</Form.Label>
                                <Form.Control type='city' placeholder='Enter a city' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='zipCode'>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type='zipCode' placeholder='Enter a zipCode' value={zipCode} onChange={(e) => setZipCode(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='state'>
                                <Form.Label>State</Form.Label>
                                <Form.Control type='state' placeholder='Enter your state' value={state} onChange={(e) => setState(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='country'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control type='country' placeholder='Enter a country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Modal.Title as="h5" className="mt-5 mb-2">
                                Contact:
                            </Modal.Title>
                            <Form.Group as={Col} controlId='Email'>
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='telephone'>
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control type='telephone' placeholder='Enter your telephone' value={telephone} onChange={(e) => setTelephone(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='mobile'>
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type='mobile' placeholder='Enter your mobile' value={mobile} onChange={(e) => setMobile(e.target.value)}></Form.Control>
                            </Form.Group>
                        </Row>
                        <Container className="justify-content-center pt-3">
                            <Button type='submit' variant='primary' className="mx-2">
                                Save
                            </Button>
                            <Button onClick={onHide} variant='primary'>
                                Cancel
                            </Button>  
                        </Container>
                    </Form> 
                </FormContainer>
            </Modal.Body>
        </Modal>
    )
}


export default NewEmployer