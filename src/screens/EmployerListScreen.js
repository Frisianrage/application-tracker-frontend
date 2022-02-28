import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const EmployerListScreen = () => {
  const [employerData, setEmployerData] = useState('')
  const [isLoading, setIsLoading] = useState('false')

  const history = useNavigate()

  const token = localStorage.getItem('jwtToken')
  if(!token) {
      history('/')
  } 

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Application?')){
      const deleteApp = await axios.delete(`/api/employers/${id}`, {
        baseURL: process.env.REACT_APP_BASEURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
      })
      if(deleteApp){
        setIsLoading(true)
      }
    }
  }

  useEffect(() => {
    const getEmployers = async () => {
      isLoading(true)
      try {
        const {data} = await axios.get('/api/employers/admin/employerlist', {
          baseURL: process.env.REACT_APP_BASEURL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          }
        })
         
        if(data) {
          setEmployerData(data)
        } 
      } catch (error) {
        console.log(error)
      }
    }
      getEmployers()
      setIsLoading(false)
  }, [isLoading, token])

    
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
                <th>CREATED BY (USER ID)</th>
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
                      <td>{moment(employer.createdAt).format('MM/DD/YY')}</td>
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