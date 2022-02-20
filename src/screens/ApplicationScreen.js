import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Table, Button, Row, Col} from 'react-bootstrap'
import NewApplication from '../components/NewApplication'

const ApplicationScreen = () => {
  const [userData, setUserData] = useState('')
  const [showModal, setShowModal] = useState(false)
  
  const token = localStorage.getItem('jwtToken')
    
  const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }

  const getApplications = async () => {
    const {data} = await axios.get('/api/applications/summary', config)

    if(data) {
      setUserData(data)
    } 
  }

    useEffect(() => {
        getApplications()
    }, [])

    const deletHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this Product?')){
            console.log('delete')
        }
    }

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
                        <i className='fas fa-plus' /> New Applications
                    </Button>
                </Col>
            </Row>
            
                <>
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
                                <td>{application.employer.employer.companyname}</td>
                                <td>{application.location.city}/{application.location.state}</td>
                                <td>{application.createdAt}</td>
                                <td>{application.status}</td>

                                <td>
                                    <LinkContainer to={`/applications/${application._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deletHandler()}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                          ))
                        ) : (
                         <tr>
                           NO APPLICATIONS FOUND!
                         </tr> 
                        )}
                            
                        
                    </tbody>
                </Table>
                </>
             
        </Container>
      </>
        
    )
}

export default ApplicationScreen