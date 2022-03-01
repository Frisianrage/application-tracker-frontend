import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/auth'
import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
  const history = useNavigate()

  const { user, login } = useContext(AuthContext)
  const email = process.env.REACT_APP_DEMO_MAIL
  const password = process.env.REACT_APP_DEMO_PASSWORD

  const demoHandler = (e) => {
    e.preventDefault()
    login(email, password) 
  }

  useEffect(() => {
    if(user){
        history('/dashboard')
    }
}, [user,history])

  return (
   
    <div className="home-back">
      <Container fluid>
      <div className="home">
          <Row as='h4'>
              <pre className='pre-head'>W E L C O M E  T O</pre>
          </Row>
          <Row as='h1' >
              <pre className='home-head'>A P P L I C A T E</pre> 
          </Row>
          <Row as='h6'>
            <pre className='home-text'>the new way of keeping track of your job applications</pre>
          </Row>
          <Row >
          <pre className="home-btn">
            <Button type='button' className="m-4 p-4" variant='outline-primary' style={{color: 'white', borderColor: 'white'}} onClick={() => history('/login')}>
              Start here 
            </Button>
            <Button type='button' className="m-4 p-4" variant='outline-primary' style={{color: 'white', borderColor: 'white'}} onClick={demoHandler}>
              Demo 
            </Button>
          </pre>
            
          
          
        </Row>
        
      </div>
      </Container>
    </div>
       
  );
}

export default HomeScreen