import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import NewEmployer from '../components/NewEmployer'

const EmployerScreen = () => {
  const [employerData, setEmployerData] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [refresh, setRefresh] = useState('false')

  const token = localStorage.getItem('jwtToken')
    
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }

  const getEmployers = async () => {
    const {data} = await axios.get('/api/employers', config)

    if(data) {
      setEmployerData(data)
    } 
  }

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Employer?')){
      const deleteEmpl = await axios.delete(`/api/employers/profile/${id}`, config)
      if(deleteEmpl){
        console.log(deleteEmpl)
        setRefresh(true)
      }
    }
  }

  useEffect(() => {
      getEmployers()
      setRefresh(false)
  }, [showModal, refresh])

    
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
        <>
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
                      <td>{employer.applications.length}</td>
                      <td>{employer.createdAt}</td>
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
        </>
      </Container>
    </>   
  )
}

export default EmployerScreen