import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../context/auth'
import { Button } from 'react-bootstrap'
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
   
    <div className="home">
      <div>
          <h4 className="pre-head">
            <pre>W E L C O M E  T O</pre>
          </h4>
          <h1 className="home-head">
            A P P L I C A T E 
          </h1>
          <p className="home-text">the new way of keeping track of your job applications</p>
      </div>
      <div className="home-btn">
        <Button type='button' className="mx-3 p-4" variant='outline-primary' style={{color: 'white', borderColor: 'white'}} onClick={() => history('/login')}>
        Start here 
      </Button>
      <Button type='button' className="mx-3 p-4" variant='outline-primary' style={{color: 'white', borderColor: 'white'}} onClick={demoHandler}>
        Demo 
      </Button>
      </div>
      
    </div>
       
  );
}

export default HomeScreen