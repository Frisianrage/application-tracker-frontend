import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'

const UserListScreen = () => {
  const [userData, setUserData] = useState('')
  const [isLoading, setIsLoading] = useState('false')

  const history = useNavigate()

  const token = localStorage.getItem('jwtToken')
  if(!token) {
      history('/')
  }
    
  const config = {
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  }

  const deletHandler = async (id) => {
    if(window.confirm('Are you sure you want to delete this Application?')){
      const deleteApp = await axios.delete(`/api/users/${id}`, config)
      if(deleteApp){
        setIsLoading(true)
      }
    }
  }

  useEffect(() => {
      const getUsers = async () => {
        setIsLoading(true)
        try {
          const {data} = await axios.get('/api/users/admin/userslist', {
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
    }; 
    setIsLoading(false)
    getUsers() 
  }, [isLoading, token])

    
  return (
    <>
      <Container fluid className="px-5">
        <Row className="align-items-center">
          <Col>
              <h2 className="p-3" style={{ width: '50%'}}><u>USERS</u></h2>
          </Col>
        </Row>
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>USER ID</th>
                <th>FIRSTNAME</th>
                <th>LASTNAME</th>
                <th>CITY / STATE</th>
                <th>MEMBER SINCE</th>
                <th>APPLICATIONS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData ? (
                userData.map(user => (
                  <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.location.city}/{user.location.state}</td>
                      <td>{moment(user.createdAt).format('MM/DD/YY')}</td>
                      <td>{user.applications.length}</td>
                      <td>
                        <LinkContainer to={`/users/${user._id}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit' />
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => deletHandler(user._id)}>
                          <i className='fas fa-trash' />
                        </Button>
                      </td>
                  </tr>
                ))
                ) : (
                <tr>
                  <td>NO USERS FOUND!</td>
                </tr> 
              )}
            </tbody>
          </Table>
        </>
      </Container>
    </>   
  )
}

export default UserListScreen