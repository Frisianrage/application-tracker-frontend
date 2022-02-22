import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const EmployerListScreen = () => {
  const [employerData, setEmployerData] = useState('')
  const [refresh, setRefresh] = useState('false')

  const token = localStorage.getItem('jwtToken')
    
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }

  const getEmployers = async () => {
    const {data} = await axios.get('/api/employers/admin/employerlist', config)
     
    if(data) {
      setEmployerData(data)
    } 
  }

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Application?')){
      const deleteApp = await axios.delete(`/api/employers/${id}`, config)
      if(deleteApp){
        setRefresh(true)
      }
    }
  }

  useEffect(() => {
      getEmployers()
      setRefresh(false)
  }, [refresh])

    
  return (
      <Container fluid className="px-5">
        <Row className="align-items-center">
          <Col>
              <h2 className="p-3" style={{ width: '50%'}}><u>Employers</u></h2>
          </Col>
        </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>COMPANY ID</th>
                <th>COMPANY NAME</th>
                <th>LOCATION</th>
                <th>CREATED AT</th>
                <th>CREATED BY</th>
                <th>APPLICATIONS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employerData ? (
                employerData.map(employer => (
                  <tr key={employer._id}>
                      <td>{employer._id}</td>
                      <td>{employer.companyname}</td>
                      <td>{employer.location.city}/{employer.location.state}</td>
                      <td>{employer.createdAt}</td>
                      <td>{employer.user._id}</td>
                      <td>{employer.applications.length}</td>
                      <td>
                        <LinkContainer to={`/employers/profile/${employer._id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit' />
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deletHandler(employer._id)}>
                          <i className='fas fa-trash' />
                        </Button>
                      </td>
                  </tr>
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

export default EmployerListScreen