import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Row, Col } from 'react-bootstrap'

function LastEmployer() {
    const [userData, setUserData] = useState('')

  const token = localStorage.getItem('jwtToken')
    
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }

  const getEmployer = async () => {
    const {data} = await axios.get('/api/employers/lastchanged', config)
     
    if(data) {
      setUserData(data)
    } 
  }

  useEffect(() => {
      getEmployer()
  }, [])

    
  return (
      <Container>
        <Row className="align-items-center">
          <Col>
              <h5><u>Last changed Employer</u></h5>
          </Col>
        </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>COMPANY</th>
                <th>CITY</th>
                <th>STATE</th>
                <th>COUNTRY</th>
                <th>APPLICATIONS</th>
                <th>CREATED AT</th>
              </tr>
            </thead>
            <tbody>
                {userData && userData[0] ? (
                    <LinkContainer to={`/employers/profile/${userData[0]._id}`}>
                        <tr>
                            <td>{userData[0].companyname}</td>
                            <td>{userData[0].location.city}</td>
                            <td>{userData[0].location.state}</td>
                            <td>{userData[0].location.country}</td>
                            <td>{userData[0].applications.length}</td>
                            <td>{userData[0].createdAt}</td>   
                        </tr>
                    </LinkContainer>
                ) : (
                <tr>
                  <td>NO APPLICATIONS FOUND!</td>
                </tr> 
              )}
            </tbody>
          </Table>
      </Container>
  )
}

export default LastEmployer