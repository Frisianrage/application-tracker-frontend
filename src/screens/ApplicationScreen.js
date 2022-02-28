import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import NewApplication from '../components/NewApplication'

const ApplicationScreen = () => {
  const [userData, setUserData] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState('false')

  const history = useNavigate()

  const {user} = useContext(AuthContext)

  const token = localStorage.getItem('jwtToken')
  if(!token) {
      history('/')
  }

  const deletHandler = async (id, employerId) => {
    if(window.confirm('Are you sure you want to delete this Application?')){
      if(user && user.email === process.env.REACT_APP_DEMO_MAIL){
        window.alert('This application gets deleted here! This is just a demo! No new application deleted!')
      } else {
        const deleteApp = await axios.delete(`/api/applications/${id}/delete/${employerId}`, {
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
  }

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true)
      
      try {
        const {data} = await axios.get('/api/applications/summary', {
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
      getApplications()
      setIsLoading(false)
  }, [showModal, isLoading, token])

    
  return (
    <>
      <NewApplication showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <Row className="align-items-center">
          <Col>
              <h2><u>Applications</u></h2>
          </Col>
          <Col className='text-right justify-content-end'>
              <Button className='my-3' onClick={() => {setShowModal(true)}}>
                  <i className='fas fa-plus' /> New Application
              </Button>
          </Col>
        </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>JOBTITLE</th>
                <th>COMPANY</th>
                <th>LOCATION</th>
                <th>APPLIED AT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData && userData.applications ? (
                userData.applications.map(application => (
                  <tr key={application._id}>
                      <td>{application.jobtitle}</td>
                      <td>{application.company.employer.companyname}</td>
                      <td>{application.location.city}/{application.location.state}</td>
                      <td>{moment(application.createdAt).format('MM/DD/YY')}</td>
                      <td>{application.status}</td>
                      <td>
                        <LinkContainer to={`/applications/${application._id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit' />
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deletHandler(application._id, application.company.employer._id)}>
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
      </Container>
    </>   
  )
}

export default ApplicationScreen