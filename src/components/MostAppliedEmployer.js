import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Row, Col } from 'react-bootstrap'

function MostAppliedEmployer() {
    const [userData, setUserData] = useState('')
  
    const token = localStorage.getItem('jwtToken')
      
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
      }
    }
  
    const getApplications = async () => {
      const {data} = await axios.get('/api/employers/mostapplied', config)
       
      if(data) {
        setUserData(data)
      } 
    }

    useEffect(() => {
        getApplications()
    }, [])

    

  return (
    <Container>
        <Row className="align-items-center">
          <Col>
              <h5><u>Most applied employer</u></h5>
          </Col>
        </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>COMPANYNAME</th>
                <th>LOCATION</th>
                <th>APPLICATIONS</th>
              </tr>
            </thead>
            <tbody>
              {userData ?(
                userData.map(employer => (
                    <LinkContainer key={employer._id} to={`/employers/profile/${employer._id}`}>
                        <tr>
                            <td>{employer.companyname}</td>
                            <td>{employer.location.city}</td>
                            <td>{employer.applications.length}</td>
                        </tr>
                    </LinkContainer>
                ))
                ) : (
                <tr>
                  <td>NO EMPLOYERS FOUND!</td>
                </tr> 
              )}
            </tbody>
          </Table>
      </Container>
  )
}

export default MostAppliedEmployer