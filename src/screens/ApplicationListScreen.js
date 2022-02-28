import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const ApplicationsListScreen = () => {
  const [applicationData, setApplicationData] = useState('')
  const [isLoading, setIsLoading] = useState('false')

  const history = useNavigate()

  const token = localStorage.getItem('jwtToken')
  if(!token) {
      history('/')
  }

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Application?')){
      const deleteApp = await axios.delete(`/api/applications/${id}`, {
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
    const getApplications = async () => {
      setIsLoading(true)
      
      try {
        const {data} = await axios.get('/api/applications/admin/applicationslist', {
          baseURL: process.env.REACT_APP_BASEURL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          }
        })
       
      if(data) {
        setApplicationData(data)
      } 
      } catch (error) {
        console.log(error)
      }
      
    }
      getApplications()
      setIsLoading(false)
  }, [isLoading, token])

    
  return (
      <Container fluid className="px-5">
        <Row className="align-items-center">
          <Col>
              <h2 className="p-3" style={{ width: '50%'}}><u>Applications</u></h2>
          </Col>
        </Row>
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>USER ID</th>
                <th>USER</th>
                <th>APPLICATION ID</th>
                <th>COMPANY</th>
                <th>JOBTITLE</th>
                <th>LOCATION</th>
                <th>APPLIED AT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {applicationData ? (
                applicationData.map(application => (
                  <tr key={application._id}>
                      <td>{application.applicant._id}</td>
                      <td>{application.applicant.firstname} {" "} {application.applicant.lastname}</td>
                      <td>{application._id}</td>
                      <td>{application.company.employer.companyname}</td>
                      <td>{application.jobtitle}</td>
                      <td>{application.location.city}/{application.location.state}</td>
                      <td>{moment(application.createdAt).format('MM/DD/YY')}</td>
                      <td>{application.status}</td>
                      <td>
                        <LinkContainer to={`/applications/${application._id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit' />
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deletHandler(application._id)}>
                          <i className='fas fa-trash' />
                        </Button>
                      </td>
                  </tr>
                ))
                ) : (
                <tr>
                  <td>NO APPLICATIONS FOUND!</td>
                </tr> 
              )}
            </tbody>
          </Table>
        </>
      </Container>
  )
}

export default ApplicationsListScreen