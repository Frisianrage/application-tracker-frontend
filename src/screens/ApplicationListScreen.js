import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const ApplicationsListScreen = () => {
  const [applicationData, setApplicationData] = useState('')
  const [refresh, setRefresh] = useState('false')

  const token = localStorage.getItem('jwtToken')
    
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }

  const getApplications = async () => {
    const {data} = await axios.get('/api/applications/admin/applicationslist', config)
     
    if(data) {
      setApplicationData(data)
    } 
  }

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Application?')){
      const deleteApp = await axios.delete(`/api/applications/${id}`, config)
      if(deleteApp){
        setRefresh(true)
      }
    }
  }

  useEffect(() => {
      getApplications()
      setRefresh(false)
  }, [refresh])

    
  return (
    <>
      <Container>
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
                      <td>{application.company.employer.companyname}</td>
                      <td>{application.jobtitle}</td>
                      <td>{application.location.city}/{application.location.state}</td>
                      <td>{application.createdAt}</td>
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
    </>   
  )
}

export default ApplicationsListScreen