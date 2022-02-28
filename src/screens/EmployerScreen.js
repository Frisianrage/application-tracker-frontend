import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/auth'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import NewEmployer from '../components/NewEmployer'

const EmployerScreen = () => {
  const [employerData, setEmployerData] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState('false')

  const history = useNavigate()

  const {user} = useContext(AuthContext)

  const token = localStorage.getItem('jwtToken')
  if(!token) {
      history('/')
  }

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Employer?')){
      if(user && user.email === process.env.REACT_APP_DEMO_MAIL){
        window.alert('This employer gets deleted here! This is just a demo! No new emlpoyer deleted!')
      } else {
        const deleteEmpl = await axios.delete(`/api/employers/profile/${id}`, {
          baseURL: process.env.REACT_APP_BASEURL,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          }
        })
        if(deleteEmpl){
        setIsLoading(true)
        }
      } 
    }
  }

  useEffect(() => {
    const getEmployers = async () => {
      setIsLoading(true)

      try {
        const {data} = await axios.get('/api/employers', {
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
  }, [showModal, isLoading, token])

    
  return (
    <>
      <NewEmployer showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <Row className="align-items-center">
          <Col>
              <h2><u>Employers</u></h2>
          </Col>
          <Col className='text-right justify-content-end'>
              <Button className='my-3' onClick={() => {setShowModal(true)}}>
                  <i className='fas fa-plus' /> New Employer
              </Button>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employerData && employerData.employers ? (
                employerData.employers.map(employer => (
                  <tr key={employer._id}>
                      <td>{employer.companyname}</td>
                      <td>{employer.location.city}</td>
                      <td>{employer.location.state}</td>
                      <td>{employer.location.country}</td>
                      <td>{employer.applicationCount}</td>
                      <td>{moment(employer.createdAt).format('MM/DD/YY')}</td>
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
    </>   
  )
}

export default EmployerScreen