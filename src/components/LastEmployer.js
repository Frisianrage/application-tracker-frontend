import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Row, Col } from 'react-bootstrap'

function LastEmployer() {
  const [userData, setUserData] = useState('')
  const [isLoading, setIsLoading] = useState('false')

  const token = localStorage.getItem('jwtToken')
  
  useEffect(() => {
    const getEmployer = async () => {
      setIsLoading(true)
      
      try {
        const {data} = await axios.get('/api/employers/lastchanged', {
          baseURL: process.env.REACT_APP_BASEURL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          }
        })
       
        if(data) {
          setUserData(data)
        } 
      } catch (error) {
        console.log(error)
      }
    }
      getEmployer()
      setIsLoading(false)
  }, [isLoading, token])

    
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
                            <td>{moment(userData[0].createdAt).format('MM/DD/YY')}</td>   
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