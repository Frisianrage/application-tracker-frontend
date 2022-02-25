import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function HomeScreen() {
  const history = useNavigate()

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
      <Button type='button' className="home-btn" variant='outline-primary' style={{color: 'white', borderColor: 'white'}} onClick={() => history('/login')}>
        Start here 
      </Button>
    </div>
       
  );
}

export default HomeScreen