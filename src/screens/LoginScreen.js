import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context/auth'
import {useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {Form, Button, Row, Col} from 'react-bootstrap'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const history = useNavigate();
    
    const {user,login} = useContext(AuthContext)
    
    const submitHandler = (e) => {
        e.preventDefault()
        login(email, password) 
    }

    useEffect(() => {
        if(user){
            history('/')
        }
    }, [user,history])

    return (
        <FormContainer>
            <h1>Login</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Login
                </Button>
            </Form> 
            <Row className='py-3'>
                <Col>
                    New Customer? Link follows....
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen